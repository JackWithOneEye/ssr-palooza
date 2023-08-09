use crate::{dashboard::Dashboard, frameworks::FrameworksRoutes};
use leptos::*;
use leptos_meta::*;
use leptos_router::*;

#[component]
pub fn App(cx: Scope) -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context(cx);

    view! { cx,
        // injects a stylesheet into the document <head>
        // id=leptos means cargo-leptos will hot-reload this stylesheet
        <Stylesheet id="leptos" href="/pkg/leptos_start.css"/>

        // sets the document title
        <Title text="LISTS!"/>

        <Router>
            <main class="contents">
                <div class="h-screen flex flex-col">
                    <nav class="flex items-center px-1 py-2 dark:bg-gray-900">
                        <div class="basis-1/3">
                            <button class=" ounded-sm px-2 py-2 hover:bg-gray-800">
                                "TODO SIDEMENU"
                            </button>
                        </div>
                        <div class="flex basis-1/3 justify-center">
                            <A class="text-2xl font-bold tracking-tight mx-2" exact=true href="/">
                                "LISTS!"
                            </A>
                        </div>
                    </nav>
                    <span>"TODO BREADCRUMBS"</span>
                    <div class="flex flex-1 gap-x-4 gap-y-4 overflow-auto p-4">
                        <Routes>
                            <Route path="" view=|cx| view! { cx, <Redirect path="dashboard"/> }/>
                            <Route path="/dashboard" view=Dashboard/>
                            <FrameworksRoutes/>
                            <Route path="/*any" view=NotFound/>
                        </Routes>
                    </div>
                // SIDEMENU HERE
                </div>
            </main>
        </Router>
    }
}

/// Renders the home page of your application.
#[component]
fn HomePage(cx: Scope) -> impl IntoView {
    view! { cx, <h1>"HOME"</h1> }
}

/// 404 - Not Found
#[component]
fn NotFound(cx: Scope) -> impl IntoView {
    // set an HTTP status code 404
    // this is feature gated because it can only be done during
    // initial server-side rendering
    // if you navigate to the 404 page subsequently, the status
    // code will not be set because there is not a new HTTP request
    // to the server
    #[cfg(feature = "ssr")]
    {
        // this can be done inline because it's synchronous
        // if it were async, we'd use a server function
        let resp = expect_context::<leptos_actix::ResponseOptions>(cx);
        resp.set_status(actix_web::http::StatusCode::NOT_FOUND);
    }

    view! { cx, <h1>"Not Found"</h1> }
}
