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
    #[prop(optional)] header: Option<CardHeader>,
    body: CardBody,
    #[prop(optional)] footer: Option<CardFooter>,
) -> impl IntoView {
    let header_slot = if let Some(h) = header {
        view! {  <header class="flex items-center gap-4 p-4">{(h.children)()}</header> }.into_view()
    } else {
        ().into_view()
    };

    let footer_slot = if let Some(f) = footer {
        view! {  <footer class="flex justify-end p-4">{(f.children)()}</footer> }.into_view()
    } else {
        ().into_view()
    };

    view! {
        <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 max-w-screen-md flex-1 flex flex-col">
            {header_slot}
            <main class="flex flex-col flex-auto overflow-auto">{(body.children)()}</main>
            {footer_slot}
        </div>
    }
}
