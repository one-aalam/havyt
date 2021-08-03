<img src="./public/logo.png" alt="Havyt"/>

Learn Fastify by building a Recipe App (Typescript Ready)

__Havyt__ is Node.js Full-Stack Web Application that's built ground-up, step-by-step to
- Introduce the essential components of Fastify like the _server_, _router_ and powerful constructs like _plugins_, _hooks_ and _decorators_ all while remaining simple in its approach so that it's easy for new comers to the Framework to pick things
- Show the workings of a modern  Node.js framework that values stability, extensibility and speed over simple ergnomics
- Possibly accomodate all sorts of very common use cases with time (while remaining commited to simplicity) either in the `main` branch
    - Fastify for APIs
    - Fastify for Server Side Web Apps
    - Fastify & Auth
- Or, extended use cases like
    - Fastify & Modern FE Frameworks (Svelte, SolidJS, etc.)
    - Fastify Fully-Tested (setup is available, but lagging currently )
    - Fastify and different DB flavors(The main repo has just a hand-rolled FS based data store)
    - Fastify & GraphQL
    - Fastify for Serverless
    - Fastify & Micro-services

Note: The repo may remain **Concept-Complete First** than Feature-complete, so that individual important commits could be checked out, and built upon as an exercise to learn about different features in-depth.

## Commits so far...
__partially documented__

| Topic                                    | Sub-topic                                                  | Commit                                                                             |
|------------------------------------------|------------------------------------------------------------|------------------------------------------------------------------------------------|
| 1.Setup                                  | [Set-up Typescript, ESLint, Prettier, ts-node-dev](https://github.com/one-aalam/havyt/commit/856878f689a27ba846c7212bdbd580df47ce6df2)           |
|                                          | [Husky and lint-staged](https://github.com/one-aalam/havyt/commit/fb360392f3d026972009cdf6cfb00930ec35dd10)                                      |
| 2. Model Entities                        | [Add Types](https://github.com/one-aalam/havyt/commit/a821513745a6a616f29bab04834ccfb922ba1ac9)                                                  |
|                                          | [Add Fixtures](https://github.com/one-aalam/havyt/commit/cc6c520003eb5f32444c7dfe2dbde0157f644478)                                               |
| 3. Serve                                 | [Your first HTTP Server](https://github.com/one-aalam/havyt/commit/5c6d6a2f8fa444b326988de334dd2283db06a103)                                     |
|                                          | [Your First HTTP Server with Fastify](https://github.com/one-aalam/havyt/commit/7abbc253603cd3832035f34840651aa809c601ef)                        |
|                                          | [Use ES Syntax for a better looking code](https://github.com/one-aalam/havyt/commit/07e16e8288153462ff2be468bb1f8321376dbfab)                    |
|                                          | [Keep Fastify App and Server, close but separate](https://github.com/one-aalam/havyt/commit/7025757278dfbb1fd3241f9661792aaeb4e9e0f4)            |
|                                          | [Catch Server exceptions, and exit the process](https://github.com/one-aalam/havyt/commit/e3cc6624758537a6ea0c3a9434e881e5fe5f4ae8)              |
| 4. GET what they want                    | [Create routes per resource](https://github.com/one-aalam/havyt/commit/7d513dea8bc09df72426b2b7e9b99d6c3aecce59)                                 |
|                                          | [Get creative with /GETs](https://github.com/one-aalam/havyt/commit/9d536e47b17c0388225f929e0da04c127eed0625)                                    |
|                                          | [Type what you receive](https://github.com/one-aalam/havyt/commit/afd9042f365f1fbd0a40ef604251893e6822415e)                                      |
|                                          | [Get more creative with /GET (recipe)](https://github.com/one-aalam/havyt/commit/0214cf354285253a83042aeeb439084a806cda5c)                       |
|                                          | [Tell what you don't have](https://github.com/one-aalam/havyt/commit/5148ed68d6f5f007aaffed8ba1e620dcc17a54ce)                                   |
|                                          | [Tell what you don't have (JSON edition)](https://github.com/one-aalam/havyt/commit/e91496fa7cd07c4f5f7b1de09d3ec76a7892ae5b)                    |
| 5. Be able to get more of what they want | [HTTP verb galore - more ways to receive actions (category)](https://github.com/one-aalam/havyt/commit/308b1624a49b3f57e5c89f5fb47c201b87dcf74c) |
|                                          | [Enforce constraints, inform data issues](https://github.com/one-aalam/havyt/commit/1baba2f602dde96e2bb1c2b0c896791f91effe43)                    |
|                                          | [Type easy](https://github.com/one-aalam/havyt/commit/4bb5375fc9cc30592538a67662e71d1580e4d340)                                                  |
|                                          | [Exercise: Add more methods for recipe](https://github.com/one-aalam/havyt/commit/0d1a1eaadb76e9ab64a265b723ee159d24355f23)                      |
| 6. Validate what you get                 | [Add validation with JSON Schema](https://github.com/one-aalam/havyt/commit/1e6f8370899f3f46bfc9ad58223a1fb9b04b4fb5)                            |
|                                          | [Schemas to Types](https://github.com/one-aalam/havyt/commit/72d4e2fe2b9ff9adfbacbfd10433be693c1d9c3a)                                           |
|                                          | [Add serialisation with JSON Schema](https://github.com/one-aalam/havyt/commit/f5314176a5cbc3c1c4f1e72d01a4603344755625)                         |
|                                          | [Re-factor: Add Per-resource schema files](https://github.com/one-aalam/havyt/commit/eac3bff7fddd20ce191c043f4d17ef7805e2596d)                   |
|                                          | [Derive types from schemas](https://github.com/one-aalam/havyt/commit/590bf12a138fb4ff7598c69bddf4caa932543eaf)                                  |
|                                          | [Add schemas to Get All calls](https://github.com/one-aalam/havyt/commit/6de3be04c2747e1982aea0c34e95f4292b3ad5ec)                               |
