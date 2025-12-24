import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json({ projects });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
