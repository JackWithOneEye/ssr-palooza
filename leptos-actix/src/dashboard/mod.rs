use leptos::*;
use leptos_router::*;

#[component]
pub fn Dashboard(cx: Scope) -> impl IntoView {
    view! { cx,
        <div class="flex items-center justify-center w-full">
            <ul class="list-disc list-inside">
                <li class="border-l-4 border-transparent data-[active]:border-sky-500 hover:dark:bg-gray-700">
                    <A class="cursor-pointer ml-1" href="/frameworks">
                        "Frameworks"
                    </A>
                </li>
            </ul>
        </div>
    }
}
