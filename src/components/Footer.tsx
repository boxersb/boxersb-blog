export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="border-t py-8" style={{borderColor: 'var(--color-border)'}}>
            <div className="mx-auto max-w-[1080px] px-4">
                <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                    &copy; {year} boxersb. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
