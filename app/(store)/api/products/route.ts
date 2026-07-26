import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
      // Revalidate index performance
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from FakeStore API' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}