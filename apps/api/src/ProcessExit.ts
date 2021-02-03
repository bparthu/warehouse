export function setupGracefulExit() {
    process.on("unhandledRejection", (reason, p: any) => {
        console.error({
            message: `Possibly Unhandled Rejection at: Promise ${p} reason: ${reason}`,
            err: p._trace ? p._trace.stack : p
        })
    })

    process.on("uncaughtException", (err: any) => {
        console.error({
            message: "An uncaught exception occurred!",
            private: {
                message: err.message
            },
            err: err.stack ? err.stack : err
        })
    })
}
