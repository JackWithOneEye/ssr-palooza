use leptos::*;

#[slot]
pub struct CardHeader {
    children: Children,
}

#[slot]
pub struct CardBody {
    children: Children,
}

#[slot]
pub struct CardFooter {
    children: Children,
}

#[component]
pub fn Card(
    cx: Scope,
    #[prop(optional)] header: Option<CardHeader>,
    body: CardBody,
    #[prop(optional)] footer: Option<CardFooter>,
) -> impl IntoView {
    let header_slot = if let Some(h) = header {
        view! { cx, <header class="flex items-center gap-4 p-4">{(h.children)(cx)}</header> }
            .into_view(cx)
    } else {
        ().into_view(cx)
    };

    let footer_slot = if let Some(f) = footer {
        view! { cx, <footer class="flex justify-end p-4">{(f.children)(cx)}</footer> }.into_view(cx)
    } else {
        ().into_view(cx)
    };

    view! { cx,
        <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 max-w-screen-md flex-1 flex flex-col">
            {header_slot}
            <main class="flex flex-col flex-auto overflow-auto">{(body.children)(cx)}</main>
            {footer_slot}
        </div>
    }
}
