// /middleware.ts
/* import { User } from "next-auth";
import { headers } from "next/headers"; */
import { NextRequest, NextResponse } from "next/server";

export const middleware = async( request: NextRequest ) => {

  /* const session:session = await fetch(`${process.env.serverURL}/api/auth/session`, {
    headers:headers(),
    // cache: "no-store"
  })
  .then( async( res ) => await res.json() ); */

  const loggedIn = true;
  const pathname = request.nextUrl.pathname;
  if ( pathname != "/auth/login" && !loggedIn ){
    return NextResponse.redirect( new URL( '/auth/login', process.env.serverURL ) );
  }

}

export const config = {
  matcher : ["/admin/:path*"]
}
