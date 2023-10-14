'use client'

import { useEffect, useRef, useState } from 'react'

export default function Home() {
    const [symbol, setSymbol] = useState('NASDAQ:TSLA')
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(
        () => {
            const node = containerRef.current
            const script = document.createElement("script")
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
            script.type = "text/javascript"
            script.async = true
            script.innerHTML = `
                    {
                        "symbol": "${symbol}",
                        "width": 350,
                        "height": 220,
                        "locale": "en",
                        "dateRange": "3M",
                        "colorTheme": "dark",
                        "isTransparent": false,
                        "autosize": false,
                        "largeChartUrl": ""
                    }
                `
            node?.appendChild(script)
            return () => {
                node?.replaceChildren()
            }
        },
        [symbol]
    )

    return (
        <>
            <div className="tradingview-widget-container" ref={containerRef}>
                <div className="tradingview-widget-container__widget"></div>
            </div>
            <input value={symbol} onChange={e => setSymbol(e.target.value)} />
        </>
    )
}