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
    fn new(name: &str, description: &str, is_poop: bool) -> Framework {
        Framework {
            id: Uuid::new_v4(),
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
        let created = Framework::new(&name, &description, is_poop);
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
                Framework::new("AngolaJS", "legacy code", true),
                Framework::new("Cockout.js", "MVVM", false),
                Framework::new("Eww.js", "ewwwwwwwwwwww", false),
                Framework::new("R***t", "Vi***al D*M", true),
                Framework::new("SolidPoopJS", "signals", false),
                Framework::new("Swolte", "Rich Harris... what a mensch", false),
            ],
        }
    }
}
