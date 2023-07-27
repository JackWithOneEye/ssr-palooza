/**
 * @typedef {{id: string; name: string; description: string; isPoop: boolean}} Framework
 */

/** @type {Framework[]} */
const seed = [
    {
        id: 'f235dcd0-9366-45f2-8c6f-a807423f3b17',
        name: 'AngolaJS',
        description: 'legacy code',
        isPoop: true
    },
    {
        id: 'dcf1d4b1-72f6-4376-9e2a-3c9c30201353',
        name: 'Cockout.js',
        description: 'MVVM',
        isPoop: false
    },
    {
        id: '36b8ae37-63a0-49a0-8468-b4d0e1a7cb60',
        name: 'Eww.js',
        description: 'ewwwwwwwwwwww',
        isPoop: false
    },
    {
        id: 'a568eb0a-f2e6-4a06-83f2-afb6a1013345',
        name: 'R***t',
        description: 'Vi***al D*M',
        isPoop: true
    },
    {
        id: 'f9c678ae-a66d-474b-a47a-4b7a5a3558f7',
        name: 'SolidPoopJS',
        description: 'signals',
        isPoop: false
    },
    {
        id: '46921658-c23c-468a-aa4c-7c6588182f39',
        name: 'Swolte',
        description: 'Rich Harris... what a mensch',
        isPoop: false
    }
];

class Database {
    get frameworks() {
        return this.__frameworks;
    }

    constructor() {
        /** @type {Framework[]} */
        this.__frameworks = seed;
    }

    /**
     * @param framework {Omit<Framework, 'id'>} 
     * @returns {Framework}
     */
    createFramework(framework) {
        /** @type {Framework} */
        const newFw = {
            ...framework,
            id: crypto.randomUUID(),
        };
        this.__frameworks.push(newFw);
        return newFw;
    }

    /** 
     * @param id {string} 
     * @returns {Framework | undefined}
     */
    deleteFramework(id) {
        const idx = this.__frameworks.findIndex((fw) => fw.id === id);
        if (idx < 0) {
            return;
        }
        const deleted = this.__frameworks[idx]
        this.__frameworks.splice(idx, 1);
        return deleted;
    }

    /** @param id {string} */
    getFramework(id) {
        return this.__frameworks.find((fw) => fw.id === id);
    }

    /**
     * @param id {string} 
     * @param framework {Omit<Framework, 'id'>} 
     * @returns {Framework | undefined}
     */
    updateFramework(id, framework) {
        for (const fw of this.__frameworks) {
            if (fw.id === id) {
                fw.name = framework.name;
                fw.description = framework.description;
                fw.isPoop = framework.isPoop;
                return fw;
            }
        }
    }
}

const database = new Database();

export default database;