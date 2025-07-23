
export function SiteFooter() {
    return (
        <footer className="w-full border-t">
            <div className="container flex h-24 flex-col items-center justify-between gap-4 py-10 md:flex-row md:py-0">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} UKM PONJA. Dibuat oleh <span className="font-medium">Rani Kirana</span>.
                </p>
            </div>
        </footer>
    );
}
