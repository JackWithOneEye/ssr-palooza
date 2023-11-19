use crate::database::Framework;
use leptos::*;
use uuid::Uuid;

#[server(CreateFramework, "/api")]
pub async fn create_framework(
    name: String,
    description: String,
    is_poop: Option<String>,
) -> Result<Framework, ServerFnError> {
    use crate::AppState;
    use actix_web::dev::ConnectionInfo;
    use actix_web::web::Data;
    use leptos_actix::extract;

    let app_state =
        extract(|data: Data<AppState>, _connection: ConnectionInfo| async { data.into_inner() })
            .await?;

    let fw = app_state.db.write()?.create_framework(Framework {
        name,
        description,
        is_poop: is_poop.is_some(),
        ..Default::default()
    });
    Ok(fw)
}

#[server(DeleteFramework, "/api")]
pub async fn delete_framework(id: Uuid) -> Result<Option<Framework>, ServerFnError> {
    use crate::AppState;
    use actix_web::dev::ConnectionInfo;
    use actix_web::http::StatusCode;
    use actix_web::web::Data;
    use leptos_actix::{extract, ResponseOptions};

    let app_state =
        extract(|data: Data<AppState>, _connection: ConnectionInfo| async { data.into_inner() })
            .await?;

    let fw = app_state.db.write()?.delete_framework(id);

    let response = expect_context::<ResponseOptions>();
    if fw.is_none() {
        response.set_status(StatusCode::NOT_FOUND);
    }
    Ok(fw)
}

#[server(GetFramework, "/api")]
pub async fn get_framework(id: Uuid) -> Result<Option<Framework>, ServerFnError> {
    use crate::AppState;
    use actix_web::dev::ConnectionInfo;
    use actix_web::http::StatusCode;
    use actix_web::web::Data;
    use leptos_actix::{extract, ResponseOptions};

    let app_state =
        extract(|data: Data<AppState>, _connection: ConnectionInfo| async { data.into_inner() })
            .await?;

    let fw = app_state.db.read()?.get_framework(id);

    let response = expect_context::<ResponseOptions>();
    if fw.is_none() {
        response.set_status(StatusCode::NOT_FOUND);
    }
    Ok(fw)
}

#[server(GetFrameworks, "/api")]
pub async fn list_frameworks() -> Result<Vec<Framework>, ServerFnError> {
    use crate::AppState;
    use actix_web::dev::ConnectionInfo;
    use actix_web::web::Data;
    use leptos_actix::extract;

    let app_state =
        extract(|data: Data<AppState>, _connection: ConnectionInfo| async { data.into_inner() })
            .await?;

    let fws = app_state.db.read()?.list_frameworks();
    Ok(fws)
}

#[server(UpdateFramework, "/api")]
pub async fn update_framework(
    id: Uuid,
    name: String,
    description: String,
    is_poop: Option<String>,
) -> Result<Option<Framework>, ServerFnError> {
    use crate::AppState;
    use actix_web::dev::ConnectionInfo;
    use actix_web::http::StatusCode;
    use actix_web::web::Data;
    use leptos_actix::{extract, redirect, ResponseOptions};

    let app_state =
        extract(|data: Data<AppState>, _connection: ConnectionInfo| async { data.into_inner() })
            .await?;

    let fw = app_state.db.write()?.update_framework(
        id,
        Framework {
            id,
            name,
            description,
            is_poop: is_poop.is_some(),
        },
    );

    let response = expect_context::<ResponseOptions>();
    if fw.is_none() {
        response.set_status(StatusCode::NOT_FOUND);
    } else {
        redirect(&format!("/frameworks/{id}"));
    }
    Ok(fw)
}
