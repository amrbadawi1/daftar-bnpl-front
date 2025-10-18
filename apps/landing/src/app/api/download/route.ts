import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Device detection logic
  const isIOS = /iPhone|iPad|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  
  let redirectUrl: string;
  
  if (isIOS) {
    // Redirect to App Store
    redirectUrl = 'https://apps.apple.com/app/daftarpay';
  } else if (isAndroid) {
    // Redirect to Google Play Store
    redirectUrl = 'https://play.google.com/store/apps/details?id=com.daftarpay';
  } else {
    // Redirect to website for desktop users
    redirectUrl = 'https://daftarpay.com';
  }
  
  // Return redirect response
  return NextResponse.redirect(redirectUrl, { status: 302 });
}

// Handle POST requests as well (for form submissions)
export async function POST(request: NextRequest) {
  return GET(request);
}
