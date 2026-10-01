import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { defaultPlans, internshipDomains, sampleCurriculums } from '../data/seed-data';
import { ProgramPlan } from '../models/ProgramPlan';
import { Program } from '../models/Program';
import { Module } from '../models/Module';
import { Lesson } from '../models/Lesson';
import { Assignment } from '../models/Assignment';
import { Project } from '../models/Project';
import { Quiz } from '../models/Quiz';
import { Settings } from '../models/Settings';
import { Coupon } from '../models/Coupon';
import { Announcement } from '../models/Announcement';
import { Blog } from '../models/Blog';
import { Review } from '../models/Review';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techviora';

async function seedDatabase() {
  console.log('Connecting to MongoDB at:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB successfully!');

  // 1. Seed Plans
  console.log('Seeding Program Plans...');
  for (const plan of defaultPlans) {
    await ProgramPlan.findOneAndUpdate(
      { slug: plan.slug },
      { ...plan },
      { upsert: true, new: true }
    );
  }
  console.log(`Seeded ${defaultPlans.length} plans.`);

  // 2. Seed Settings
  console.log('Seeding Settings...');
  const existingSettings = await Settings.findOne();
  if (!existingSettings) {
    await Settings.create({
      siteName: 'TechViora',
      tagline: 'Structured Internship Programs & Engineering Skill Development',
      contactEmail: 'support@techviora.com',
      contactPhone: '+91 9876543210',
      contactAddress: 'TechViora Technology Hub, Cyber Park, Bengaluru, India',
      whatsappNumber: '+91 9876543210',
      socialLinks: {
        linkedin: 'https://linkedin.com/company/techviora',
        github: 'https://github.com/techviora',
        twitter: 'https://twitter.com/techviora',
        youtube: 'https://youtube.com/@techviora',
        instagram: 'https://instagram.com/techviora'
      },
      certificateSignatoryName: 'Dr. Vivek Sharma',
      certificateSignatoryTitle: 'Head of Engineering & Technical Director',
      certificateOrganizationName: 'TechViora Engineering Labs',
      progressRules: {
        lessonsWeightPercent: 50,
        assignmentsWeightPercent: 20,
        projectsWeightPercent: 20,
        quizzesWeightPercent: 10,
        minPassingPercentForCertificate: 80,
      }
    });
  }

  // 3. Seed Coupons
  console.log('Seeding Coupons...');
  const coupons = [
    {
      code: 'WELCOME50',
      discountType: 'flat',
      discountValue: 50,
      minOrderAmount: 299,
      isActive: true,
      usageLimit: 5000,
      timesUsed: 0
    },
    {
      code: 'VIORA100',
      discountType: 'flat',
      discountValue: 100,
      minOrderAmount: 499,
      isActive: true,
      usageLimit: 2000,
      timesUsed: 0
    },
    {
      code: 'EARLYBIRD',
      discountType: 'percentage',
      discountValue: 15,
      minOrderAmount: 299,
      maxDiscountAmount: 200,
      isActive: true,
      usageLimit: 1000,
      timesUsed: 0
    }
  ];

  for (const c of coupons) {
    await Coupon.findOneAndUpdate({ code: c.code }, c, { upsert: true });
  }

  // 4. Seed Programs & Curriculum
  console.log(`Seeding ${internshipDomains.length} Internship Domains...`);

  for (const domain of internshipDomains) {
    const existingProgram = await Program.findOne({ slug: domain.slug });
    
    // Default curriculum data or specialized curriculum
    const curriculumData = sampleCurriculums[domain.slug] || {
      modules: [
        {
          title: `Module 1: Foundations of ${domain.title}`,
          description: `Core principles, tools, development setup, and syntax essentials for ${domain.title}.`,
          estimatedHours: 6,
          lessons: [
            {
              title: `Introduction to ${domain.title} and Industry Ecosystem`,
              description: `Overview of tools, industry workflows, and core architecture.`,
              contentType: 'video',
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              durationMinutes: 20,
              unlockDay: 1,
              articleContent: `Welcome to the ${domain.title} internship program. This module establishes a strong foundational understanding of essential tools and industry workflows.`
            },
            {
              title: `Environment Setup & First Practical Exercise`,
              description: `Configure required software, IDEs, and run sample scripts.`,
              contentType: 'code',
              durationMinutes: 25,
              unlockDay: 2,
              codeSnippet: {
                language: 'javascript',
                filename: 'starter.js',
                code: `console.log("Welcome to ${domain.title} Internship at TechViora!");\n// Practical code sample`
              }
            }
          ],
          quiz: {
            title: `Module 1 Concept Check: ${domain.title}`,
            description: `Quick assessment on foundational concepts.`,
            questions: [
              {
                question: `What is the primary objective of studying ${domain.title}?`,
                options: [
                  "To build production-grade scalable systems and practical projects",
                  "Only for memorizing theoretical definitions",
                  "To skip practical hands-on exercises",
                  "None of the above"
                ],
                correctAnswer: 0,
                explanation: "Practical application and building industry-standard projects is the main focus."
              }
            ]
          }
        },
        {
          title: `Module 2: Practical Techniques & Core Implementation`,
          description: `Hands-on guided implementation of key technologies and design patterns.`,
          estimatedHours: 8,
          lessons: [
            {
              title: `Architectural Design Patterns in ${domain.title}`,
              description: `Best practices for writing modular, maintainable, and clean code.`,
              contentType: 'article',
              durationMinutes: 30,
              unlockDay: 3,
              articleContent: `Writing scalable code requires adhering to SOLID principles and industry design patterns.`
            }
          ],
          assignment: {
            title: `Assignment 1: ${domain.title} Practical Implementation`,
            description: `Build and submit a working module demonstrating core competency.`,
            instructions: `Implement the requested features, push your code to a public GitHub repository, and submit the link.`,
            requirements: [
              "Clean and modular code structure",
              "Proper error handling and input validation",
              "README.md with setup instructions"
            ],
            maxScore: 100
          }
        },
        {
          title: `Module 3: Capstone Project & Evaluation`,
          description: `Comprehensive capstone project integrating all learned concepts into a complete portfolio item.`,
          estimatedHours: 15,
          lessons: [
            {
              title: `Capstone Submission Guidelines`,
              description: `Detailed criteria for peer review and admin evaluation.`,
              contentType: 'article',
              durationMinutes: 20,
              unlockDay: 5,
              articleContent: `Your capstone project will be reviewed for code quality, responsiveness, architecture, and live deployment.`
            }
          ],
          project: {
            title: `${domain.title} Industry Capstone Application`,
            description: `Build a production-ready application addressing a real-world problem using ${domain.technologies.slice(0, 3).join(', ')}.`,
            requirements: [
              "End-to-end functionality working properly",
              "Live hosted deployment URL",
              "Public GitHub repository with comprehensive README",
              "Video walkthrough / screenshot demo"
            ],
            technologies: domain.technologies,
            maxMarks: 100,
            isCapstone: true
          }
        }
      ]
    };

    let programDoc;
    if (existingProgram) {
      existingProgram.title = domain.title;
      existingProgram.category = domain.category;
      existingProgram.shortDescription = domain.shortDescription;
      existingProgram.detailedDescription = domain.detailedDescription;
      existingProgram.technologies = domain.technologies;
      existingProgram.skillsCovered = domain.skillsCovered;
      existingProgram.difficulty = domain.difficulty;
      existingProgram.prerequisites = domain.prerequisites;
      existingProgram.learningOutcomes = domain.learningOutcomes;
      existingProgram.whoShouldJoin = domain.whoShouldJoin;
      existingProgram.toolsRequired = domain.toolsRequired;
      existingProgram.isFeatured = domain.isFeatured;
      existingProgram.isPopular = domain.isPopular;
      existingProgram.order = domain.order;
      existingProgram.status = 'published';
      programDoc = await existingProgram.save();
    } else {
      programDoc = await Program.create({
        title: domain.title,
        slug: domain.slug,
        category: domain.category,
        shortDescription: domain.shortDescription,
        detailedDescription: domain.detailedDescription,
        iconName: domain.iconName,
        bannerImage: `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80`,
        thumbnail: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80`,
        technologies: domain.technologies,
        skillsCovered: domain.skillsCovered,
        difficulty: domain.difficulty,
        prerequisites: domain.prerequisites,
        learningOutcomes: domain.learningOutcomes,
        whoShouldJoin: domain.whoShouldJoin,
        toolsRequired: domain.toolsRequired,
        isFeatured: domain.isFeatured,
        isPopular: domain.isPopular,
        order: domain.order,
        status: 'published',
        rating: 4.8,
        reviewCount: 42,
        enrollmentCount: 156,
        faqs: [
          {
            question: "Is this internship suitable for beginners?",
            answer: "Yes, our programs start from foundational principles and progressively build up to advanced production workflows with step-by-step guidance."
          },
          {
            question: "Will I receive a verified certificate upon completion?",
            answer: "Yes! Upon submitting all required assignments, passing module quizzes, and getting your capstone project approved, you will be issued a verifiable digital certificate with a unique QR code."
          },
          {
            question: "Can I complete this internship alongside my college schedule?",
            answer: "Absolutely. The internship is self-paced with flexible daily modules designed to fit smoothly around your university lectures and exam schedules."
          }
        ]
      });
    }

    // Seed modules and lessons if not already present
    const existingModules = await Module.countDocuments({ programId: programDoc._id });
    if (existingModules === 0) {
      let modOrder = 1;
      let totalLessons = 0;
      let totalAssignments = 0;
      let totalProjects = 0;
      let totalQuizzes = 0;

      for (const mod of curriculumData.modules) {
        const moduleDoc = await Module.create({
          programId: programDoc._id,
          title: mod.title,
          description: mod.description,
          estimatedHours: mod.estimatedHours,
          order: modOrder++,
          isPublished: true,
        });

        let lesOrder = 1;
        for (const les of mod.lessons) {
          await Lesson.create({
            moduleId: moduleDoc._id,
            programId: programDoc._id,
            title: les.title,
            description: les.description,
            contentType: les.contentType,
            videoUrl: les.videoUrl || '',
            articleContent: les.articleContent || '',
            durationMinutes: les.durationMinutes,
            unlockDay: les.unlockDay,
            order: lesOrder++,
            sourceCodeSnippet: les.codeSnippet ? {
              language: les.codeSnippet.language,
              code: les.codeSnippet.code,
              filename: les.codeSnippet.filename
            } : undefined,
            isPublished: true,
          });
          totalLessons++;
        }

        if (mod.assignment) {
          await Assignment.create({
            programId: programDoc._id,
            moduleId: moduleDoc._id,
            title: mod.assignment.title,
            description: mod.assignment.description,
            instructions: mod.assignment.instructions,
            requirements: mod.assignment.requirements,
            maxScore: mod.assignment.maxScore,
            isPublished: true,
            order: 1
          });
          totalAssignments++;
        }

        if (mod.project) {
          await Project.create({
            programId: programDoc._id,
            title: mod.project.title,
            description: mod.project.description,
            requirements: mod.project.requirements,
            technologies: mod.project.technologies,
            maxMarks: mod.project.maxMarks,
            isCapstone: mod.project.isCapstone || false,
            isPublished: true,
            order: 1
          });
          totalProjects++;
        }

        if (mod.quiz) {
          await Quiz.create({
            programId: programDoc._id,
            moduleId: moduleDoc._id,
            title: mod.quiz.title,
            description: mod.quiz.description,
            questions: mod.quiz.questions,
            totalMarks: mod.quiz.questions.length * 5,
            passingMarks: Math.ceil(mod.quiz.questions.length * 5 * 0.6),
            isPublished: true,
            order: 1
          });
          totalQuizzes++;
        }
      }

      programDoc.modulesCount = curriculumData.modules.length;
      programDoc.lessonsCount = totalLessons;
      programDoc.assignmentsCount = totalAssignments;
      programDoc.projectsCount = totalProjects;
      programDoc.quizzesCount = totalQuizzes;
      await programDoc.save();
    }
  }
  console.log('Programs & Curriculums seeded.');

  // 5. Seed Announcements
  console.log('Seeding Announcements...');
  const announcements = [
    {
      title: '🎉 Welcome to TechViora Batch 2026',
      content: 'We are thrilled to welcome our new cohort of engineering students. Please explore your curriculum roadmap, submit assignments before deadlines, and check out the Capstone project guidelines.',
      type: 'general',
      priority: 'high',
      isPublished: true,
    },
    {
      title: '💡 Pro-Tip: Clean Code & Git Best Practices',
      content: 'Ensure all GitHub repositories for your assignments include a descriptive README.md, clear commit messages, and a modular folder structure.',
      type: 'general',
      priority: 'medium',
      isPublished: true,
    }
  ];

  for (const ann of announcements) {
    await Announcement.findOneAndUpdate({ title: ann.title }, ann, { upsert: true });
  }

  // 6. Seed Blogs
  console.log('Seeding Blogs...');
  const blogs = [
    {
      title: 'How Engineering Students Can Build Real Full-Stack Portfolio Projects in 2026',
      slug: 'how-to-build-full-stack-portfolio-projects',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Moving beyond tutorial clones to production-grade applications with database schema design, authentication, and cloud deployment.',
      content: `
# Building Standout Full-Stack Projects in 2026

Recruiters and engineering teams are overwhelmed by cookie-cutter projects. To stand out as a fresher or engineering student, you need to showcase real-world engineering fundamentals:

### 1. Robust Architecture & Database Modeling
Start with normalized relational schemas or well-indexed document structures. Prevent unbounded growth in arrays and implement proper data validation.

### 2. Authentication & Security
Implement secure HTTP-only cookies for JWT tokens, bcrypt password hashing, input sanitization, and role-based route protection.

### 3. Asynchronous Operations & Error Boundaries
Handle loading, empty, and network failure states gracefully. Implement retry mechanisms and centralized error logging.

### 4. Continuous Integration & Deployment
Host your live project with custom domains, SSL certificates, and automated GitHub Actions pipelines.
      `,
      category: 'Career & Tech',
      tags: ['Full Stack', 'Web Development', 'Career Advice', 'Portfolio'],
      readTimeMinutes: 6,
      viewsCount: 1420,
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: 'The Roadmap to Mastering Data Structures and Algorithms for Product Companies',
      slug: 'mastering-dsa-roadmap-for-interviews',
      thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc03a290aa3?w=800&auto=format&fit=crop&q=80',
      excerpt: 'A structured step-by-step roadmap to conquer time complexity, recursion, dynamic programming, and graph algorithms.',
      content: `
# Mastering DSA Step-by-Step

A systematic approach to cracking technical interview coding rounds:

1. **Phase 1**: Arrays, Strings, Hash Maps, and Two Pointers
2. **Phase 2**: Recursion, Linked Lists, Stacks & Queues
3. **Phase 3**: Binary Trees, BSTs, Heaps, and Backtracking
4. **Phase 4**: Graphs (BFS/DFS, Dijkstra) and Dynamic Programming (1D & 2D)

Focus on pattern recognition rather than memorizing individual solutions!
      `,
      category: 'Data Structures',
      tags: ['DSA', 'Interviews', 'Algorithms', 'Placements'],
      readTimeMinutes: 5,
      viewsCount: 2310,
      isPublished: true,
      publishedAt: new Date(),
    }
  ];

  for (const b of blogs) {
    await Blog.findOneAndUpdate({ slug: b.slug }, b, { upsert: true });
  }

  // 7. Seed Admin User
  console.log('Seeding Default Admin User...');
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@techviora.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@TechViora2026';
  const adminName = process.env.ADMIN_NAME || 'TechViora Administrator';

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'superadmin',
      emailVerified: true,
      status: 'active'
    });
    console.log(`Created default admin user: ${adminEmail}`);
  } else {
    existingAdmin.role = 'superadmin';
    await existingAdmin.save();
    console.log(`Verified superadmin user: ${adminEmail}`);
  }

  // 8. Seed Demo Student User
  const studentEmail = 'student@techviora.com';
  const existingStudent = await User.findOne({ email: studentEmail });
  if (!existingStudent) {
    const studentPassword = await bcrypt.hash('Student@2026', 12);
    await User.create({
      name: 'Aditya Kumar',
      email: studentEmail,
      password: studentPassword,
      phone: '9876543210',
      role: 'student',
      emailVerified: true,
      status: 'active'
    });
    console.log(`Created demo student user: ${studentEmail}`);
  }

  console.log('✅ TechViora Database Seeding Completed Successfully!');
  await mongoose.disconnect();
}

seedDatabase().catch((err) => {
  console.error('Seeding failed with error:', err);
  process.exit(1);
});
