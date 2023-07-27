use super::Layout;
use crate::{database::Framework, state::SharedAppState, templates::TEMPLATES};
use axum::{
    extract::{Path, State},
    http::{HeaderMap, StatusCode},
    response::{Html, IntoResponse},
    routing::get,
    Form, Router,
};
use serde::Serialize;
use tera::Context;
use uuid::Uuid;

pub fn frameworks_router() -> Router<SharedAppState> {
    Router::new()
        .route("/", get(frameworks))
        .route("/new", get(framework_new).post(post_new_framework))
        .route(
            "/:id",
            get(framework_detail)
                .delete(delete_framework)
                .patch(patch_framework),
        )
        .route("/:id/edit", get(framework_edit))
}

#[axum::debug_handler]
async fn frameworks(headers: HeaderMap, State(state): State<SharedAppState>) -> impl IntoResponse {
    match headers.get("HX-Request") {
        Some(_) => {
            let frameworks = state.read().unwrap().db.list_frameworks();
            let mut context = Context::new();
            context.insert("frameworks", &frameworks);

            Html(
                TEMPLATES
                    .render("frameworks/frameworks.html", &context)
                    .unwrap(),
            )
        }
        None => Html(
            TEMPLATES
                .render(
                    "layout.html",
                    &Context::from_serialize(Layout {
                        deep_link_path: "frameworks",
                    })
                    .unwrap(),
                )
                .unwrap(),
        ),
    }
}

#[derive(Serialize)]
struct FrameworkDetailTemplate {
    framework: Framework,
}

#[axum::debug_handler]
async fn framework_detail(
    Path(id): Path<Uuid>,
    State(state): State<SharedAppState>,
) -> impl IntoResponse {
    match state.read().unwrap().db.get_framework(id) {
        Some(framework) => {
            let tmpl = FrameworkDetailTemplate { framework };
            Ok(Html(
                TEMPLATES
                    .render(
                        "frameworks/framework-detail.html",
                        &Context::from_serialize(tmpl).unwrap(),
                    )
                    .unwrap(),
            ))
        }
        None => Err(StatusCode::NOT_FOUND),
    }
}

#[axum::debug_handler]
async fn framework_edit(
    Path(id): Path<Uuid>,
    State(state): State<SharedAppState>,
) -> impl IntoResponse {
    match state.read().unwrap().db.get_framework(id) {
        Some(framework) => {
            let tmpl = FrameworkDetailTemplate { framework };

            Ok(Html(
                TEMPLATES
                    .render(
                        "frameworks/framework-edit.html",
                        &Context::from_serialize(tmpl).unwrap(),
                    )
                    .unwrap(),
            ))
        }
        None => Err(StatusCode::NOT_FOUND),
    }
}

#[axum::debug_handler]
async fn framework_new() -> impl IntoResponse {
    let mut resp_headers = HeaderMap::new();
    resp_headers.insert(
        "HX-Navigate",
        make_navigate_payload("/frameworks/new", "#frameworks-router", true)
            .parse()
            .unwrap(),
    );
    (
        resp_headers,
        Html(
            TEMPLATES
                .render("frameworks/framework-new.html", &Context::new())
                .unwrap(),
        ),
    )
}

#[derive(Serialize)]
struct FrameworkDeleteTemplate {
    framework: Framework,
    targets_list_item: bool,
}

#[axum::debug_handler]
async fn delete_framework(
    headers: HeaderMap,
    Path(id): Path<Uuid>,
    State(state): State<SharedAppState>,
) -> impl IntoResponse {
    match state.write().unwrap().db.delete_framework(id) {
        Some(framework) => {
            let mut tmpl = FrameworkDeleteTemplate {
                framework,
                targets_list_item: false,
            };
            if let Some(target_id) = headers.get("HX-Target") {
                let target_id = target_id.to_str().unwrap_or("");
                tmpl.targets_list_item = target_id.starts_with("framework-list-item-");
            }
            let mut resp_headers = HeaderMap::new();
            resp_headers.insert(
                "HX-Navigate",
                make_navigate_payload("/frameworks", "#frameworks-router", true)
                    .parse()
                    .unwrap(),
            );

            Ok((
                resp_headers,
                Html(
                    TEMPLATES
                        .render(
                            "frameworks/framework-delete-response.html",
                            &Context::from_serialize(tmpl).unwrap(),
                        )
                        .unwrap(),
                ),
            ))
        }
        None => Err(StatusCode::NOT_FOUND),
    }
}

#[axum::debug_handler]
async fn patch_framework(
    Path(id): Path<Uuid>,
    State(state): State<SharedAppState>,
    Form(body): Form<Framework>,
) -> impl IntoResponse {
    match state.write().unwrap().db.update_framework(id, body) {
        Some(framework) => {
            let tmpl = FrameworkDetailTemplate { framework };
            let mut resp_headers = HeaderMap::new();
            resp_headers.insert(
                "HX-Navigate",
                make_navigate_payload(&format!("/frameworks/{}", &id), "#frameworks-router", true)
                    .parse()
                    .unwrap(),
            );
            Ok((
                resp_headers,
                Html(
                    TEMPLATES
                        .render(
                            "frameworks/framework-patch-response.html",
                            &Context::from_serialize(tmpl).unwrap(),
                        )
                        .unwrap(),
                ),
            ))
        }
        None => Err(StatusCode::NOT_FOUND),
    }
}

#[axum::debug_handler]
async fn post_new_framework(
    State(state): State<SharedAppState>,
    Form(body): Form<Framework>,
) -> impl IntoResponse {
    let framework = state.write().unwrap().db.create_framework(body);
    let id = framework.id;
    let tmpl = FrameworkDetailTemplate { framework };
    let mut resp_headers = HeaderMap::new();
    resp_headers.insert(
        "HX-Navigate",
        make_navigate_payload(&format!("/frameworks/{}", &id), "#frameworks-router", true)
            .parse()
            .unwrap(),
    );

    (
        resp_headers,
        Html(
            TEMPLATES
                .render(
                    "frameworks/framework-post-response.html",
                    &Context::from_serialize(tmpl).unwrap(),
                )
                .unwrap(),
        ),
    )
}

// fn make_workflow_on_init_payload(key: &str) -> String {
//     format!("{{ \"workflowOnInit\": {{ \"key\": \"{}\" }}}}", key)
// }

fn make_navigate_payload(path: &str, router_elt: &str, silent: bool) -> String {
    format!(
        "{{\"path\": \"{}\", \"routerElt\": \"{}\", \"silent\": {}}}",
        path, router_elt, silent
    )
}
