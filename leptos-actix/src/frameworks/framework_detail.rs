use crate::components::{Card, CardBody, CardFooter, CardHeader};
use crate::database::Framework;
use crate::frameworks::{api, FrameworkError, FrameworksActions};
use leptos::leptos_dom::logging::console_log;
use leptos::*;
use leptos_router::*;
use uuid::Uuid;

#[derive(Params, PartialEq, Clone, Debug)]
struct FrameworkDetailParams {
    id: Uuid,
}

#[component]
pub fn FrameworkDetail() -> impl IntoView {
    let FrameworksActions {
        patch_framework, ..
    } = use_context::<FrameworksActions>().expect("NO1!!!");

    let params = use_params::<FrameworkDetailParams>();

    let framework = create_resource(
        move || {
            (
                params.with(|p| {
                    p.as_ref()
                        .map(|p| p.id)
                        .map_err(|_| FrameworkError::InvalidId)
                }),
                patch_framework.version().get(),
            )
        },
        move |(id, _)| async move {
            match id {
                Err(e) => Err(e),
                Ok(id) => api::get_framework(id)
                    .await
                    .map(|resp| resp.ok_or(FrameworkError::NotFound))
                    .map_err(|_| FrameworkError::ServerError)
                    .flatten(),
            }
        },
    );

    let (edit, set_edit) = create_query_signal::<bool>("edit");

    view! {
        <Transition fallback=|| ()>
            <ErrorBoundary fallback=| _| {
                view! {  <Redirect path="/frameworks"/> }
            }>
                {move || {
                    framework
                        .with(

                            |framework| {
                                framework
                                    .clone()
                                    .map(|framework| {
                                        view! {  <DetailInner framework=framework.unwrap() edit set_edit/> }
                                    })
                            },
                        )
                }}

            </ErrorBoundary>

        </Transition>
    }
}

#[component]
pub fn DetailInner(
    framework: Framework,
    edit: Memo<Option<bool>>,
    set_edit: SignalSetter<Option<bool>>,
) -> impl IntoView {
    let framework = create_rw_signal(framework);

    view! {
        <Card>
            <CardHeader slot:header>
                <h5 class="panel-header">
                    {move || framework.with(|framework| framework.name.clone())}
                </h5>
                <div class="flex-1 flex justify-end">
                    <Show when=move || edit.with(|e| !e.unwrap_or(false)) fallback=|| ()>
                        <button
                            class="btn-primary"
                            on:click=move |_| {
                                console_log("CLICK");
                                set_edit(Some(true));
                            }
                        >

                            "EDIT"
                        </button>
                    </Show>
                </div>
            </CardHeader>
            <CardBody slot:body>
                <Show
                    when=move || edit.with(|e| !e.unwrap_or(false))
                    fallback=move || {
                        console_log("???");
                        view! {  <FrameworkForm framework /> }}
                >
                    <div class="flex flex-col flex-1 gap-6 px-4 overflow-auto">
                        <div class="flex flex-col justify-between gap-2">
                            <div class="font-semibold">"Name"</div>
                            <div class="p-1 border-solid border rounded-md border-black dark:border-white">
                                {move || {
                                    framework
                                        .with(|framework| {
                                            framework.name.clone()
                                        })
                                }}
                            </div>
                        </div>
                        <div class="flex flex-col justify-between gap-2">
                            <div class="font-semibold">"Description"</div>
                            <div class="p-1 h-[6.5rem] overflow-auto border-solid border rounded-md border-black dark:border-white">
                                {move || {
                                    framework.with(|framework| framework.description.clone())
                                }}

                            </div>
                        </div>
                        <div class="flex flex-row items-center gap-4 text-xl pointer-events-none">
                            <input
                                class="w-8 h-8"
                                type="checkbox"
                                checked=move || { framework.with(|framework| framework.is_poop) }

                                readonly
                            />
                            <div class="font-semibold">{'💩'} "?"</div>
                        </div>
                    </div>
                </Show>

            </CardBody>
            <CardFooter slot:footer>
                <Show when=move || edit.with(|e| !e.unwrap_or(false)) fallback=|| ()>
                    <button
                        class="btn-secondary"
                        on:click=move |_| {
                            let navigate = use_navigate();
                            navigate("/frameworks", Default::default());
                        }
                    >

                        "BACK"
                    </button>
                </Show>
            </CardFooter>
        </Card>
    }
}

#[component]
fn FrameworkForm(
    framework: RwSignal<Framework>,
    // set_edit: SignalSetter<Option<bool>>,
) -> impl IntoView {
    let FrameworksActions {
        patch_framework, ..
    } = use_context::<FrameworksActions>().expect("NO2!!!");

    view! {
        <ActionForm class="flex flex-col h-full" action=patch_framework>
            <input
                type="hidden"
                hidden
                name="id"
                prop:value=move || framework.with(|framework| framework.id.to_string())
            />
            <div class="flex flex-col flex-1 gap-6 px-4 overflow-auto">
                <div class="flex flex-col justify-between gap-2">
                    <label for="name" class="font-semibold">
                        "Name"
                    </label>
                    <input
                        class="p-1 outline-none border-solid border rounded-md border-black dark:border-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        name="name"
                        type="text"
                        autocomplete="off"
                        required
                        value=move || framework.with(|framework| framework.name.clone())
                    />

                </div>
                <div class="flex flex-col justify-between gap-2">
                    <label for="description" class="font-semibold">
                        "Description"
                    </label>
                    <textarea
                        name="description"
                        class="resize-none p-1 outline-none border-solid border rounded-md border-black dark:border-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        required
                        rows="4"
                        prop:value=move || framework.with(|framework| framework.description.clone())
                    ></textarea>
                </div>
                <div class="flex flex-row items-center gap-4 text-xl">
                    <input
                        name="is_poop"
                        class="w-8 h-8 cursor-pointer"
                        type="checkbox"
                        checked=move || framework.with(|framework| framework.is_poop)
                    />
                    <label for="is_poop" class="font-semibold">
                        {'💩'}
                        "?"
                    </label>
                </div>
            </div>
            <div class="flex justify-end p-4">
                <button class="btn-primary">"SAVE"</button>
            </div>
        </ActionForm>
    }
}

// #[cfg(feature = "ssr")]
// fn do_redirect() {
//     use leptos_actix::redirect;
//     redirect( "/frameworks");
// }

// #[cfg(not(any(feature = "ssr", feature = "csr")))]
// fn do_redirect() {
//     let nav = use_navigate();
//     let _ = nav("frameworks", Default::default());
// }
