use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Clone, Default, Debug, Deserialize, Eq, Ord, PartialEq, PartialOrd, Serialize)]
pub struct Framework {
    #[serde(default)]
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub is_poop: bool,
}

impl Framework {
    fn new(name: &str, description: &str, is_poop: bool, id: Option<String>) -> Framework {
        Framework {
            id: id
                .map(|id| Uuid::parse_str(&id).unwrap())
                .unwrap_or(Uuid::new_v4()),
            name: String::from(name),
            description: String::from(description),
            is_poop,
        }
    }
}

#[derive(Clone, Debug)]
pub struct Database {
    pub frameworks: Vec<Framework>,
}

impl Database {
    pub fn create_framework(&mut self, framework: Framework) -> Framework {
        let Framework {
            name,
            description,
            is_poop,
            ..
        } = framework;
        let created = Framework::new(&name, &description, is_poop, None);
        let clone = created.clone();
        self.frameworks.push(created);
        self.frameworks
            .sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase()));

        clone
    }

    pub fn delete_framework(&mut self, id: Uuid) -> Option<Framework> {
        let index = self.frameworks.iter().position(|f| f.id.eq(&id))?;
        Some(self.frameworks.remove(index))
    }

    pub fn get_framework(&self, id: Uuid) -> Option<Framework> {
        let fw = self.frameworks.iter().find(|f| f.id.eq(&id))?;
        Some(fw.clone())
    }

    pub fn list_frameworks(&self) -> Vec<Framework> {
        self.frameworks.to_vec()
    }

    pub fn update_framework(&mut self, id: Uuid, update: Framework) -> Option<Framework> {
        let fw = self.frameworks.iter_mut().find(|f| f.id.eq(&id))?;
        fw.name = update.name;
        fw.description = update.description;
        fw.is_poop = update.is_poop;

        Some(fw.clone())
    }
}

impl Default for Database {
    fn default() -> Self {
        Database {
            frameworks: vec![
                Framework::new(
                    "AngolaJS",
                    "legacy code",
                    true,
                    Some("f235dcd0-9366-45f2-8c6f-a807423f3b17".to_string()),
                ),
                Framework::new(
                    "Cockout.js",
                    "MVVM",
                    false,
                    Some("dcf1d4b1-72f6-4376-9e2a-3c9c30201353".to_string()),
                ),
                Framework::new(
                    "Eww.js",
                    "ewwwwwwwwwwww",
                    false,
                    Some("36b8ae37-63a0-49a0-8468-b4d0e1a7cb60".to_string()),
                ),
                Framework::new(
                    "R***t",
                    "Vi***al D*M",
                    true,
                    Some("a568eb0a-f2e6-4a06-83f2-afb6a1013345".to_string()),
                ),
                Framework::new(
                    "SolidPoopJS",
                    "signals",
                    false,
                    Some("f9c678ae-a66d-474b-a47a-4b7a5a3558f7".to_string()),
                ),
                Framework::new(
                    "Swolte",
                    "Rich Harris... what a mensch",
                    false,
                    Some("46921658-c23c-468a-aa4c-7c6588182f39".to_string()),
                ),
            ],
        }
    }
}
