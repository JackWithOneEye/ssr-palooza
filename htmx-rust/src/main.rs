use axum::{routing::get, Router};
use ssr_htmx_workflow::{
    database::Database,
    state::{AppState, SharedAppState},
    views::{
        frameworks::frameworks_router,
        home::{dashboard, home, menu},
    },
};
use std::sync::{Arc, RwLock};
use tower_http::services::ServeDir;

#[tokio::main]
async fn main() {
    let state: SharedAppState = Arc::new(RwLock::new(AppState {
        db: Database::default(),
    }));

    let app = Router::new()
        .route("/", get(home))
        .route("/dashboard", get(dashboard))
        .route("/menu", get(menu))
        .nest("/frameworks", frameworks_router())
        .nest_service("/static", ServeDir::new("static"))
        .with_state(Arc::clone(&state));

    axum::Server::bind(&"127.0.0.1:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
