use super::Layout;
use crate::templates::TEMPLATES;
use axum::{
    http::HeaderMap,
    response::{Html, IntoResponse, Redirect},
};
use tera::Context;

#[axum::debug_handler]
pub async fn home() -> impl IntoResponse {
    Redirect::permanent("/dashboard")
}

#[axum::debug_handler]
pub async fn menu() -> impl IntoResponse {
    Html(TEMPLATES.render("menu.html", &Context::new()).unwrap())
}

#[axum::debug_handler]
pub async fn dashboard(headers: HeaderMap) -> impl IntoResponse {
    let context = Context::new();
    match headers.get("HX-Request") {
        Some(_) => Html(TEMPLATES.render("dashboard.html", &context).unwrap()),
        None => Html(
            TEMPLATES
                .render(
                    "layout.html",
                    &Context::from_serialize(Layout {
                        deep_link_path: "dashboard",
                    })
                    .unwrap(),
                )
                .unwrap(),
        ),
    }
}
