use crate::database::Database;
use std::sync::{Arc, RwLock};

#[derive(Clone, Debug)]
pub struct AppState {
    pub db: Database,
}

pub type SharedAppState = Arc<RwLock<AppState>>;
