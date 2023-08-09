mod api;
pub mod framework_detail;
use self::api::UpdateFramework;
use crate::{
    components::{Card, CardBody, CardFooter, CardHeader},
    database::Framework,
};
use leptos::*;
use leptos_router::*;
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Copy, Clone)]
struct FrameworksActions {
    patch_framework: Action<UpdateFramework, Result<Option<Framework>, ServerFnError>>,
}

impl FrameworksActions {
    pub fn new(cx: Scope) -> Self {
        Self {
            patch_framework: create_server_action::<UpdateFramework>(cx),
        }
    }
}

#[derive(Error, Debug, Copy, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum FrameworkError {
    #[error("Invalid ID.")]
    InvalidId,
    #[error("Not found.")]
    NotFound,
    #[error("Server error.")]
    ServerError,
}

#[component(transparent)]
pub fn FrameworksRoutes(cx: Scope) -> impl IntoView {
    view! { cx,
        <Route path="/frameworks" view=Frameworks>
            <Route path=":id" view=framework_detail::FrameworkDetail ssr=SsrMode::Async/>
            <Route path="" view=|cx| view! { cx, <div class="contents"></div> }/>
        </Route>
    }
}

#[component]
pub fn Frameworks(cx: Scope) -> impl IntoView {
    let actions = FrameworksActions::new(cx);
    provide_context(cx, actions);

    let frameworks_list = create_resource(
        cx,
        move || (actions.patch_framework.version().get()),
        move |_| async move { api::list_frameworks(cx).await.unwrap() },
    );
    let render_list_items_fallback = move || {
        view! { cx, <span>"Loading..."</span> }
    };
    let render_len_fallback = move || {
        view! { cx, <span>"..."</span> }
    };

    view! { cx,
        <div class="contents">
            <Card>
                <CardHeader slot:header>
                    <h5 class="panel-header">"Frameworks"</h5>
                    <div class="flex-1 flex justify-end">
                        <button class="btn-primary">"ADD"</button>
                    </div>
                </CardHeader>
                <CardBody slot:body>
                    <div class="flex flex-col h-full">
                        <div class="static flex-1 overflow-auto border-t border-b border-solid dark:border-slate-50">
                            <Transition fallback=render_list_items_fallback>
                                {move || {
                                    frameworks_list
                                        .read(cx)
                                        .map(|fws| {
                                            view! { cx,
                                                <For
                                                    each=move || fws.to_vec()
                                                    key=|framework| framework.id
                                                    view=move |cx, framework| {
                                                        view! { cx, <FrameworkListItem framework/> }
                                                    }
                                                />
                                            }
                                        })
                                }}

                            </Transition>
                        </div>
                    </div>
                </CardBody>
                <CardFooter slot:footer>
                    <Transition fallback=render_len_fallback>
                        {move || {
                            frameworks_list
                                .read(cx)
                                .map(|fws| {
                                    view! { cx, <span>{fws.len()} " loaded frameworks"</span> }
                                })
                        }}

                    </Transition>
                </CardFooter>
            </Card>
        </div>
        <Outlet/>
    }
}

#[component]
fn FrameworkListItem(cx: Scope, framework: Framework) -> impl IntoView {
    let Framework {
        id,
        name,
        description,
        is_poop,
    } = framework;

    let location = use_location(cx);
    let is_active = create_memo(cx, move |_| {
        let loc = location.pathname.get().to_lowercase();
        loc.contains(&id.to_string())
    });
    let toggled_path = use_resolved_path(cx, move || {
        if is_active() {
            "".to_string()
        } else {
            id.to_string()
        }
    });
    let navigate = use_navigate(cx);

    view! { cx,
        <div
            class="transition-colors aria-[current]:bg-gray-700"
            role="link"
            aria-current=is_active
            id=id.to_string()
            on:click=move |_| {
                let _ = navigate(&toggled_path.get().unwrap(), Default::default());
            }
        >

            <div class="flex border-solid border-b dark:border-slate-400 cursor-pointer p-4">
                <div class="flex flex-1 flex-col">
                    <div class="flex gap-1">
                        <div class="font-bold">{name}</div>
                        {move || { is_poop.then(|| view! { cx, <span>{'💩'}</span> }) }}

                    </div>
                    <div class="pt-1 text-xs text-slate-400">{description}</div>
                </div>
            </div>
        </div>
    }
}
