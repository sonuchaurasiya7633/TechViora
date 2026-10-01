import { connectToDatabase } from './db';
import { Progress } from '@/models/Progress';
import { Lesson } from '@/models/Lesson';
import { Assignment } from '@/models/Assignment';
import { Project } from '@/models/Project';
import { Quiz } from '@/models/Quiz';
import { Settings } from '@/models/Settings';
import { Enrollment } from '@/models/Enrollment';

export async function recalculateEnrollmentProgress(enrollmentId: string) {
  await connectToDatabase();

  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) return 0;

  const progress = await Progress.findOne({ enrollment: enrollmentId });
  if (!progress) return 0;

  const programId = enrollment.program;

  // Get total counts
  const totalLessons = await Lesson.countDocuments({ programId, isPublished: true });
  const totalAssignments = await Assignment.countDocuments({ programId, isPublished: true });
  const totalProjects = await Project.countDocuments({ programId, isPublished: true });
  const totalQuizzes = await Quiz.countDocuments({ programId, isPublished: true });

  // Get settings weights
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }

  const {
    lessonsWeightPercent = 50,
    assignmentsWeightPercent = 20,
    projectsWeightPercent = 20,
    quizzesWeightPercent = 10,
    minPassingPercentForCertificate = 80,
  } = settings.progressRules || {};

  const lessonRatio = totalLessons > 0 ? Math.min(1, (progress.completedLessons?.length || 0) / totalLessons) : 1;
  const assignmentRatio = totalAssignments > 0 ? Math.min(1, (progress.approvedAssignments?.length || 0) / totalAssignments) : 1;
  const projectRatio = totalProjects > 0 ? Math.min(1, (progress.completedProjects?.length || 0) / totalProjects) : 1;
  const quizRatio = totalQuizzes > 0 ? Math.min(1, (progress.passedQuizzes?.length || 0) / totalQuizzes) : 1;

  const calculatedPercent = Math.round(
    lessonRatio * lessonsWeightPercent +
    assignmentRatio * assignmentsWeightPercent +
    projectRatio * projectsWeightPercent +
    quizRatio * quizzesWeightPercent
  );

  const boundedPercent = Math.min(100, Math.max(0, calculatedPercent));

  // Update progress doc & enrollment doc
  progress.progressPercent = boundedPercent;
  await progress.save();

  enrollment.progressPercent = boundedPercent;
  if (boundedPercent >= minPassingPercentForCertificate && enrollment.status === 'active') {
    // Check if capstone or required items done
    if (projectRatio === 1 && assignmentRatio === 1) {
      enrollment.status = 'completed';
    }
  }
  await enrollment.save();

  return boundedPercent;
}
