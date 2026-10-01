import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Program } from '@/models/Program';
import { ProgramPlan } from '@/models/ProgramPlan';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const difficulty = searchParams.get('difficulty');
    const featured = searchParams.get('featured');

    const filter: any = { status: 'published' };
    if (category && category !== 'All') filter.category = category;
    if (difficulty && difficulty !== 'All') filter.difficulty = difficulty;
    if (featured === 'true') filter.isFeatured = true;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { technologies: { $regex: search, $options: 'i' } },
        { skillsCovered: { $regex: search, $options: 'i' } },
      ];
    }

    const [programs, plans] = await Promise.all([
      Program.find(filter).sort({ order: 1, createdAt: -1 }),
      ProgramPlan.find({ isActive: true }).sort({ sortOrder: 1 }),
    ]);

    const lowestPlanPrice = plans.length > 0 ? Math.min(...plans.map((p) => p.salePrice)) : 299;

    return NextResponse.json({
      success: true,
      count: programs.length,
      programs,
      plans,
      startingPrice: lowestPlanPrice,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
