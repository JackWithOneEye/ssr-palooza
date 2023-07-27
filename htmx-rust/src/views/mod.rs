use serde::Serialize;

pub mod frameworks;
pub mod home;

#[derive(Default, Serialize)]
struct Layout {
    deep_link_path: &'static str,
}
