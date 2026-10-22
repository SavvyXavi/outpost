import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { OrganizationSwitcher, Show, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import React from 'react';

const SiteHeader = () => {
    const pathname = usePathname();
    const {isSignedIn} = useAuth();
    const isLandingPage = pathname === "/";

    return (
        <header className="fixed inset-x-0 top-0 z-20 flex h-18 items-center justify-between border-b
        border-whiote/6 bg-background/70 px-6 backdrop-blur-md md:px-10">
            <Link href={isSignedIn && !isLandingPage ? "/dashboard" : "/"} className="flex items-center">
                {/* <Image
                    src=""
                    alt="Outpost"
                    width={314}
                    height={160}
                    className="h-9 w-auto"
                    priority
                /> */}
                Outpost
            </Link>

            {isLandingPage && (
                <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                    <Link
                        href="#product"
                        className="transition-colors hover:text-foreground"
                    >
                        Product
                    </Link>
                    <Link
                        href="#howitworks"
                        className="transition-colors hover:text-foreground"
                    >
                        How It Works
                    </Link>
                                        <Link
                        href="#pricing"
                        className="transition-colors hover:text-foreground"
                    >
                        Pricing
                    </Link>
                </nav>
            )}

            <div className="flex items-center gap-3">
                <Show when='signed-out'>
                    <SignInButton mode="modal">
                        <Button variant="ghost" size="sm">
                            Sign in
                        </Button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                        <Button size="sm">Get Started</Button>
                    </SignUpButton>
                </Show>
                
                <Show when="signed-in">
                    <OrganizationSwitcher
                        afterCreateOrganizationUrl="/dashboard"
                        afterSelectOrganizationUrl="/dashboard"
                    />
                    {isLandingPage && (
                        <Button asChild size="sm">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    )}

                    <UserButton />
                </Show>
            </div>
        </header>
    );

};

export default SiteHeader;