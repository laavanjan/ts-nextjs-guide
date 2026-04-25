const TOPICS = [

  // ── 0. HOME ──────────────────────────────────────────────
  {
    id: 'home',
    label: 'Start here',
    isHome: true,
    render() {
      return `
      <div class="hero">
        <p class="hero-eyebrow">// your learning path</p>
        <h1 class="hero-title">TypeScript for<br><em>Next.js</em></h1>
        <p class="hero-body">
          Everything you need to know before you start Next.js tomorrow —
          explained in plain English, with real examples from your actual doubts.
          10 topics. One clear path.
        </p>
        <div class="path-grid">
          ${[
            ['01','Types & Variables','Primitives, arrays, any vs unknown'],
            ['02','Functions','All 4 formats explained clearly'],
            ['03','Interfaces & Types','Object shapes and unions'],
            ['04','Generics','Reusable type slots, API wrappers'],
            ['05','Unions & Narrowing','Discriminated unions, FetchState'],
            ['06','Utility Types','Partial, Omit, Pick, ReturnType'],
            ['07','Async & Promises','Promise<T>, server components'],
            ['08','React Patterns','Props, useState, useRef, events'],
            ['09','keyof & typeof','Safe getters, infer from values'],
            ['10','Advanced Patterns','as const, type guards, template literals'],
          ].map(([n,t,s]) => `
            <div class="path-card" onclick="goToTopic(${parseInt(n)})">
              <div class="path-num">${n}</div>
              <h3>${t}</h3>
              <p>${s}</p>
            </div>
          `).join('')}
        </div>
        <button class="start-btn" onclick="goToTopic(1)">
          Begin learning →
        </button>
      </div>`;
    }
  },

  // ── 1. Types & Variables ─────────────────────────────────
  {
    id: 'types',
    label: 'Types & Variables',
    render() {
      return `
      <p class="topic-eyebrow">Topic 01</p>
      <h1 class="topic-title">Types &amp; Variables</h1>
      <p class="topic-intro">
        TypeScript adds a type layer on top of JavaScript. Every variable, parameter,
        and return value gets a type — and TypeScript catches mistakes before your
        code ever runs.
      </p>

      <div class="card">
        <span class="card-label label-core">Why TypeScript?</span>
        <h3>The core idea</h3>
        <p>In JavaScript, a variable can be anything — a string today, a number tomorrow. TypeScript makes you declare what type a value is, and then enforces that contract everywhere it's used. The payoff: autocomplete, early error detection, and self-documenting code.</p>
        <pre><span class="cm">// JavaScript — no safety</span>
<span class="kw">function</span> greet(name) { <span class="kw">return</span> <span class="st">"Hello, "</span> + name }
greet(42)  <span class="cm">// no error — but probably wrong</span>

<span class="cm">// TypeScript — name must be a string</span>
<span class="kw">function</span> greet(name: <span class="ty">string</span>): <span class="ty">string</span> {
  <span class="kw">return</span> <span class="st">\`Hello, \${name}\`</span>
}
greet(42)  <span class="cm">// ❌ Error: Argument of type 'number' not assignable to 'string'</span></pre>
      </div>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>Primitive types</h3>
        <p>The five types you'll use everywhere in Next.js — in pages, components, and API routes.</p>
        <pre><span class="kw">let</span> name: <span class="ty">string</span>  = <span class="st">"Laavanjan"</span>
<span class="kw">let</span> age: <span class="ty">number</span>   = <span class="num">24</span>
<span class="kw">let</span> active: <span class="ty">boolean</span> = <span class="kw">true</span>
<span class="kw">let</span> data: <span class="ty">null</span>    = <span class="kw">null</span>
<span class="kw">let</span> val: <span class="ty">undefined</span> = <span class="kw">undefined</span>

<span class="cm">// Arrays</span>
<span class="kw">let</span> ids: <span class="ty">number</span>[]  = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>]
<span class="kw">let</span> names: <span class="ty">string</span>[] = [<span class="st">"Alice"</span>, <span class="st">"Bob"</span>]

<span class="cm">// Tuples — fixed length + types</span>
<span class="kw">let</span> pair: [<span class="ty">string</span>, <span class="ty">number</span>] = [<span class="st">"age"</span>, <span class="num">24</span>]</pre>
      </div>

      <div class="card">
        <span class="card-label label-warn">Gotcha</span>
        <h3>any, unknown, void, never</h3>
        <p>These four special types confuse everyone at first. Here's the plain-English version:</p>
        <pre><span class="cm">// any — turns off type checking completely (avoid this)</span>
<span class="kw">let</span> x: <span class="ty">any</span> = <span class="st">"anything goes"</span>
x = <span class="num">42</span>       <span class="cm">// no error — TypeScript gave up</span>

<span class="cm">// unknown — honest version of any. Must narrow before use.</span>
<span class="kw">let</span> apiData: <span class="ty">unknown</span> = fetchSomething()
<span class="kw">if</span> (<span class="kw">typeof</span> apiData === <span class="st">"string"</span>) {
  console.log(apiData.toUpperCase()) <span class="cm">// ✅ safe — narrowed</span>
}

<span class="cm">// void — function returns nothing (event handlers)</span>
<span class="kw">function</span> onClick(): <span class="ty">void</span> { console.log(<span class="st">"clicked"</span>) }

<span class="cm">// never — function that never returns (throws an error)</span>
<span class="kw">function</span> crash(msg: <span class="ty">string</span>): <span class="ty">never</span> { <span class="kw">throw new</span> Error(msg) }</pre>
        <div class="insight">
          <strong>Rule of thumb:</strong> Use <code>unknown</code> for anything coming from an API or external source. Use <code>any</code> only as a last resort — it turns off TypeScript entirely for that value.
        </div>
        ${quiz('Which type should you use for an unvalidated API response?',
          ['any', 'unknown', 'void'], 1,
          'unknown forces you to check the type before using it — much safer than any, which silently accepts anything.')}
      </div>`;
    }
  },

  // ── 2. Functions ─────────────────────────────────────────
  {
    id: 'functions',
    label: 'Functions',
    render() {
      return `
      <p class="topic-eyebrow">Topic 02</p>
      <h1 class="topic-title">Functions</h1>
      <p class="topic-intro">
        There are only 2 ways to write a function — <code>function</code> keyword and arrow <code>=></code>.
        The four "formats" you saw are just those two used in different contexts.
        Once you see the pattern, it stops being confusing.
      </p>

      <div class="mental-model">
        <h4>The one-line mental model</h4>
        <p>
          <strong style="color:var(--accent)">Format 1</strong> — defining a named function<br>
          <strong style="color:var(--teal)">Format 2</strong> — storing an arrow function in a variable<br>
          <strong style="color:var(--blue)">Format 3</strong> — describing a function's <em>shape</em> (not a real function)<br>
          <strong style="color:var(--coral)">Format 4</strong> — optional params &amp; default values
        </p>
      </div>

      <div class="card">
        <span class="card-label label-core">Format 1</span>
        <h3>Named function declaration</h3>
        <p>The classic. TypeScript just adds <code>: type</code> after each parameter and after the closing parenthesis for the return type.</p>
        <pre><span class="kw">function</span> <span class="fn">add</span>(a: <span class="ty">number</span>, b: <span class="ty">number</span>): <span class="ty">number</span> {
  <span class="kw">return</span> a + b
}
<span class="cm">//      ↑name  ↑params+types          ↑return type</span></pre>
        <div class="insight"><strong>When to use:</strong> Top-level utility functions, Next.js server components, anything you want to call before it's defined in the file (hoisting).</div>
      </div>

      <div class="card">
        <span class="card-label label-core">Format 2</span>
        <h3>Arrow function stored in a variable</h3>
        <p>Same idea — but stored in a <code>const</code>. The types go in exactly the same places.</p>
        <pre><span class="kw">const</span> greet = (name: <span class="ty">string</span>): <span class="ty">string</span> => <span class="st">\`Hi \${name}\`</span>
<span class="cm">//   ↑name    ↑param+type    ↑return type  ↑body</span></pre>
        <div class="insight"><strong>When to use:</strong> Callbacks, event handlers, functions inside React components. This is the most common style inside components.</div>
      </div>

      <div class="card">
        <span class="card-label label-next">Format 3</span>
        <h3>Function described as a type — NOT a real function</h3>
        <p>This is just a blueprint. It says "any variable of this type must be a function shaped like this." You use it when typing props that accept a function.</p>
        <pre><span class="cm">// NOT a function — just a blueprint</span>
<span class="kw">type</span> <span class="ty">Handler</span> = (event: <span class="ty">MouseEvent</span>) => <span class="ty">void</span>
<span class="kw">type</span> <span class="ty">Fetcher</span> = (id: <span class="ty">number</span>) => <span class="ty">Promise</span>&lt;<span class="ty">User</span>&gt;

<span class="cm">// Now use the blueprint to type real variables</span>
<span class="kw">const</span> onClick: <span class="ty">Handler</span> = (e) => console.log(e)
<span class="kw">const</span> getUser: <span class="ty">Fetcher</span> = <span class="kw">async</span> (id) => fetch(<span class="st">\`/api/\${id}\`</span>).then(r => r.json())</pre>
        <div class="insight"><strong>When to use:</strong> Inside interface/prop definitions. When multiple functions should share the same signature, define it once and reuse.</div>
      </div>

      <div class="card">
        <span class="card-label label-warn">Format 4</span>
        <h3>Optional params &amp; default values</h3>
        <p>Two separate ideas that look similar. They solve different problems.</p>
        <pre><span class="cm">// Default value — param always has a value inside the function</span>
<span class="kw">function</span> log(msg: <span class="ty">string</span>, level: <span class="ty">string</span> = <span class="st">"info"</span>): <span class="ty">void</span> {
  console.log(<span class="st">\`[\${level}] \${msg}\`</span>)
}

<span class="cm">// Optional param — level might be undefined inside</span>
<span class="kw">function</span> log2(msg: <span class="ty">string</span>, level?: <span class="ty">string</span>): <span class="ty">void</span> {
  console.log(level ?? <span class="st">"info"</span>, msg)  <span class="cm">// must handle undefined</span>
}</pre>
        <div class="compare-grid">
          <div class="compare-col good"><h4>= "info" (default)</h4><p style="font-size:13px;color:var(--text2)">TypeScript infers the type. Inside the function, <code>level</code> is always a string. Clean.</p></div>
          <div class="compare-col bad"><h4>level? (optional)</h4><p style="font-size:13px;color:var(--text2)">Inside the function, <code>level</code> is <code>string | undefined</code>. You must handle the undefined case.</p></div>
        </div>
        ${quiz('What type is "level" inside the function when declared as level?: string?',
          ['string', 'string | undefined', 'undefined'], 1,
          'The ? makes the param optional — so inside the function body, level could be string or undefined. You must handle both cases.')}
      </div>`;
    }
  },

  // ── 3. Interfaces & Types ────────────────────────────────
  {
    id: 'interfaces',
    label: 'Interfaces & Types',
    render() {
      return `
      <p class="topic-eyebrow">Topic 03</p>
      <h1 class="topic-title">Interfaces &amp; Types</h1>
      <p class="topic-intro">
        <code>interface</code> describes the shape of an object. <code>type</code> does everything interface does
        — plus unions, intersections, and more. The key rule: use <code>interface</code> for
        objects, use <code>type</code> for unions and combinations.
      </p>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>interface — the backbone of Next.js components</h3>
        <p>You'll define interfaces for every component's props, every API response, and every form. This is the most-used TypeScript feature in a Next.js app.</p>
        <pre><span class="kw">interface</span> <span class="ty">User</span> {
  id: <span class="ty">number</span>
  name: <span class="ty">string</span>
  email: <span class="ty">string</span>
  avatar?: <span class="ty">string</span>  <span class="cm">// ? means optional — can be omitted</span>
}

<span class="cm">// Extending — AdminUser has everything User has, plus more</span>
<span class="kw">interface</span> <span class="ty">AdminUser</span> <span class="kw">extends</span> <span class="ty">User</span> {
  role: <span class="ty">string</span>
  permissions: <span class="ty">string</span>[]
}</pre>
      </div>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>The purpose of <code>type</code> — unions</h3>
        <p><code>interface</code> can only describe object shapes. <code>type</code> can describe a value that is one of several options. You cannot write <code>interface Status = "idle" | "loading"</code> — it's not valid.</p>
        <pre><span class="cm">// type for unions — interface can't do this</span>
<span class="kw">type</span> <span class="ty">Status</span> = <span class="st">"idle"</span> | <span class="st">"loading"</span> | <span class="st">"success"</span> | <span class="st">"error"</span>
<span class="kw">type</span> <span class="ty">Size</span>   = <span class="st">"sm"</span> | <span class="st">"md"</span> | <span class="st">"lg"</span>
<span class="kw">type</span> <span class="ty">ID</span>     = <span class="ty">string</span> | <span class="ty">number</span>

<span class="cm">// Use in props — only "sm", "md", "lg" allowed. Nothing else.</span>
<span class="kw">interface</span> <span class="ty">ButtonProps</span> {
  size: <span class="ty">Size</span>      <span class="cm">// ❌ "xl" would be a compile error</span>
  status: <span class="ty">Status</span>
  id: <span class="ty">ID</span>
}</pre>
        <div class="insight"><strong>The payoff:</strong> Passing <code>size="banana"</code> gives a compile error immediately, not a runtime bug hours later.</div>
      </div>

      <div class="card">
        <span class="card-label label-next">Next.js relevant</span>
        <h3>Record — shorthand for object types</h3>
        <p><code>Record&lt;K, V&gt;</code> means "an object where all keys are type K and all values are type V." These two lines are identical:</p>
        <pre><span class="kw">type</span> <span class="ty">RouteParams</span> = <span class="ty">Record</span>&lt;<span class="ty">string</span>, <span class="ty">string</span>&gt;
<span class="kw">type</span> <span class="ty">RouteParams</span> = { [key: <span class="ty">string</span>]: <span class="ty">string</span> }  <span class="cm">// same thing</span>

<span class="cm">// PageProps in Next.js App Router</span>
<span class="kw">interface</span> <span class="ty">PageProps</span> {
  params: <span class="ty">Record</span>&lt;<span class="ty">string</span>, <span class="ty">string</span>&gt;               <span class="cm">// /users/[id] → { id: "42" }</span>
  searchParams: <span class="ty">Record</span>&lt;<span class="ty">string</span>, <span class="ty">string</span> | <span class="ty">string</span>[]&gt;  <span class="cm">// ?color=red&color=blue</span>
}</pre>
        <div class="insight insight-teal">
          <strong>Why string | string[] in searchParams?</strong> The same query key can appear once (<code>?color=red</code> → string) or multiple times (<code>?color=red&color=blue</code> → string[]). Next.js types it as both because both are valid.
        </div>
        ${quiz('What does Record<string, string> mean?',
          ['An array of strings', 'An object where all keys and values are strings', 'A string that records data'], 1,
          'Record<K, V> is shorthand for an object where every key is type K and every value is type V. Record<string, string> = { [key: string]: string }.')}
      </div>`;
    }
  },

  // ── 4. Generics ──────────────────────────────────────────
  {
    id: 'generics',
    label: 'Generics',
    render() {
      return `
      <p class="topic-eyebrow">Topic 04</p>
      <h1 class="topic-title">Generics</h1>
      <p class="topic-intro">
        Generics are reusable type slots — like function parameters, but for types.
        You'll use them for API response wrappers, React hooks, and utility functions
        constantly in Next.js.
      </p>

      <div class="mental-model">
        <h4>The bouncer analogy</h4>
        <p>A generic constraint is like a bouncer with a rule: "You must have an ID to enter." Users, Posts, Comments all have an ID — they get in. A plain string doesn't — rejected at compile time. But once inside, everyone keeps their full identity. A User is still a User, not just "something with an ID."</p>
      </div>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>What are generics?</h3>
        <p>Without generics, you'd need a separate function for every type. With generics, one function works for any type.</p>
        <pre><span class="cm">// Without generics — not reusable</span>
<span class="kw">function</span> firstString(arr: <span class="ty">string</span>[]): <span class="ty">string</span> { <span class="kw">return</span> arr[<span class="num">0</span>] }
<span class="kw">function</span> firstNumber(arr: <span class="ty">number</span>[]): <span class="ty">number</span> { <span class="kw">return</span> arr[<span class="num">0</span>] }

<span class="cm">// With generics — one function, any type</span>
<span class="kw">function</span> first&lt;T&gt;(arr: T[]): T { <span class="kw">return</span> arr[<span class="num">0</span>] }

first([<span class="st">"a"</span>, <span class="st">"b"</span>])  <span class="cm">// T = string → returns string</span>
first([<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>])   <span class="cm">// T = number → returns number</span></pre>
      </div>

      <div class="card">
        <span class="card-label label-next">Next.js relevant</span>
        <h3>Generic API response wrapper — the most common pattern</h3>
        <p>Instead of typing every API response separately, wrap them all in one generic type. TypeScript traces the type through the whole chain.</p>
        <pre><span class="cm">// Define once</span>
<span class="kw">interface</span> <span class="ty">ApiResponse</span>&lt;T&gt; {
  data: T
  error: <span class="ty">string</span> | <span class="ty">null</span>
  status: <span class="ty">number</span>
}

<span class="cm">// Use it — T becomes User</span>
<span class="kw">async function</span> fetchUser(id: <span class="ty">number</span>): <span class="ty">Promise</span>&lt;<span class="ty">ApiResponse</span>&lt;<span class="ty">User</span>&gt;&gt; {
  <span class="kw">const</span> res = <span class="kw">await</span> fetch(<span class="st">\`/api/users/\${id}\`</span>)
  <span class="kw">return</span> res.json()
}

<span class="cm">// TypeScript knows response.data is User — autocomplete works!</span>
<span class="kw">const</span> response = <span class="kw">await</span> fetchUser(<span class="num">1</span>)
console.log(response.data.name)   <span class="cm">// ✅ string</span>
console.log(response.data.email)  <span class="cm">// ✅ string</span>
console.log(response.status)      <span class="cm">// ✅ number</span></pre>
        <div class="insight"><strong>The mental model:</strong> T is a placeholder that gets replaced when you use it. <code>ApiResponse&lt;User&gt;</code> → T becomes User → <code>data</code> becomes <code>User</code>. TypeScript fills it in automatically everywhere.</div>
      </div>

      <div class="card">
        <span class="card-label label-tip">Good to know</span>
        <h3>Generic constraints — <code>extends</code></h3>
        <p>You can restrict what types a generic accepts. This lets you access properties on T without TypeScript complaining.</p>
        <pre><span class="cm">// T must have an id property</span>
<span class="kw">function</span> getById&lt;T <span class="kw">extends</span> { id: <span class="ty">number</span> }&gt;(
  items: T[],
  id: <span class="ty">number</span>
): T | <span class="ty">undefined</span> {
  <span class="kw">return</span> items.find(item => item.id === id)
}

<span class="cm">// Without generics — you lose the original type</span>
<span class="kw">const</span> user1 = getById([{ id: <span class="num">1</span>, name: <span class="st">"Lavi"</span> }], <span class="num">1</span>)
user1?.name  <span class="cm">// ✅ TypeScript knows .name exists</span>

getById([<span class="st">"string"</span>], <span class="num">1</span>)  <span class="cm">// ❌ Error: string has no .id</span></pre>
        ${quiz('In ApiResponse<T>, if you write ApiResponse<Post[]>, what does T become?',
          ['string', 'Post', 'Post[]'], 2,
          'T is replaced with exactly what you write between the angle brackets. ApiResponse<Post[]> means T = Post[], so data becomes Post[].')}
      </div>`;
    }
  },

  // ── 5. Unions & Narrowing ────────────────────────────────
  {
    id: 'unions',
    label: 'Unions & Narrowing',
    render() {
      return `
      <p class="topic-eyebrow">Topic 05</p>
      <h1 class="topic-title">Unions &amp; Narrowing</h1>
      <p class="topic-intro">
        A union type says "this value can be one of these types." Narrowing is how you
        tell TypeScript which one it actually is at runtime. Together, these two ideas
        power the FetchState pattern you'll use in every Next.js app.
      </p>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>Type narrowing</h3>
        <p>When you have a union, TypeScript needs you to narrow it before using type-specific methods. This is how you safely handle API responses.</p>
        <pre><span class="kw">function</span> formatId(id: <span class="ty">string</span> | <span class="ty">number</span>): <span class="ty">string</span> {
  <span class="cm">// Narrow with typeof</span>
  <span class="kw">if</span> (<span class="kw">typeof</span> id === <span class="st">"string"</span>) {
    <span class="kw">return</span> id.toUpperCase()  <span class="cm">// ✅ id is string here</span>
  }
  <span class="kw">return</span> id.toFixed(<span class="num">0</span>)     <span class="cm">// ✅ id is number here</span>
}

<span class="cm">// instanceof for classes</span>
<span class="kw">if</span> (error <span class="kw">instanceof</span> Error) {
  console.log(error.message) <span class="cm">// ✅ safe</span>
}

<span class="cm">// 'in' operator for checking if a property exists</span>
<span class="kw">if</span> (<span class="st">"email"</span> <span class="kw">in</span> user) {
  console.log(user.email)  <span class="cm">// ✅ safe</span>
}</pre>
      </div>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>Discriminated unions — FetchState</h3>
        <p>The problem with optional fields: TypeScript has no idea when they exist.</p>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h4>Messy — optional fields</h4>
            <pre style="font-size:12px;padding:.75rem"><span class="kw">interface</span> <span class="ty">State</span> {
  status: <span class="ty">string</span>
  data?: <span class="ty">User</span>
  error?: <span class="ty">string</span>
}
<span class="cm">// When is data set?
// TypeScript doesn't know.
// This is valid (but wrong):</span>
{
  status: <span class="st">"loading"</span>,
  data: user,
  error: <span class="st">"broken"</span>
}</pre>
          </div>
          <div class="compare-col good">
            <h4>Clean — discriminated union</h4>
            <pre style="font-size:12px;padding:.75rem"><span class="kw">type</span> <span class="ty">FetchState</span> =
  | { status: <span class="st">"idle"</span> }
  | { status: <span class="st">"loading"</span> }
  | { status: <span class="st">"success"</span>; data: <span class="ty">User</span> }
  | { status: <span class="st">"error"</span>; error: <span class="ty">string</span> }
<span class="cm">// Each status carries exactly
// what it needs. No invalid
// combinations possible.</span></pre>
          </div>
        </div>
        <div class="insight insight-teal">
          <strong>The mental model:</strong> Each variant is a separate box. The <code>status</code> field is the label on the box. When TypeScript sees you check the label, it knows which box you're in — and therefore what's inside it.
        </div>
      </div>

      <div class="card">
        <span class="card-label label-next">Next.js relevant</span>
        <h3>FetchState in practice</h3>
        <p>The purpose of FetchState is to drive your UI. One clean type replaces three messy booleans.</p>
        <pre><span class="cm">// Instead of this mess:</span>
<span class="kw">const</span> [isLoading, setIsLoading] = useState(<span class="kw">false</span>)
<span class="kw">const</span> [data, setData]           = useState(<span class="kw">null</span>)
<span class="kw">const</span> [error, setError]         = useState(<span class="kw">null</span>)

<span class="cm">// Use one clean type:</span>
<span class="kw">const</span> [state, setState] = useState&lt;<span class="ty">FetchState</span>&gt;({ status: <span class="st">"idle"</span> })

setState({ status: <span class="st">"loading"</span> })
setState({ status: <span class="st">"success"</span>, data: user })
setState({ status: <span class="st">"error"</span>, error: <span class="st">"Not found"</span> })

<span class="cm">// Check status → TypeScript narrows automatically</span>
<span class="kw">if</span> (state.status === <span class="st">"success"</span>) {
  console.log(state.data.name)  <span class="cm">// ✅ no optional chaining needed</span>
}</pre>
        ${quiz('Why can\'t you access state.data without checking state.status first?',
          ['data is private', 'data only exists on the "success" variant — TypeScript enforces this', 'data is always undefined'], 1,
          'In the discriminated union, data is only defined on { status: "success"; data: User }. If you haven\'t narrowed to that variant, TypeScript doesn\'t know data exists.')}
      </div>`;
    }
  },

  // ── 6. Utility Types ─────────────────────────────────────
  {
    id: 'utility',
    label: 'Utility Types',
    render() {
      return `
      <p class="topic-eyebrow">Topic 06</p>
      <h1 class="topic-title">Utility Types</h1>
      <p class="topic-intro">
        TypeScript ships built-in types that transform existing interfaces. Instead of
        writing duplicate interfaces with slight variations, you derive new types from
        existing ones. Huge time-saver in real Next.js apps.
      </p>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>Partial, Required, Readonly</h3>
        <pre><span class="kw">interface</span> <span class="ty">User</span> {
  id: <span class="ty">number</span>
  name: <span class="ty">string</span>
  email: <span class="ty">string</span>
}

<span class="cm">// Partial — all fields become optional (great for update payloads)</span>
<span class="kw">type</span> <span class="ty">UserUpdate</span> = <span class="ty">Partial</span>&lt;<span class="ty">User</span>&gt;
<span class="cm">// { id?: number; name?: string; email?: string }</span>

<span class="cm">// Required — all optional fields become mandatory</span>
<span class="kw">type</span> <span class="ty">FullUser</span> = <span class="ty">Required</span>&lt;<span class="ty">User</span>&gt;

<span class="cm">// Readonly — can't mutate any field (great for config objects)</span>
<span class="kw">type</span> <span class="ty">FrozenUser</span> = <span class="ty">Readonly</span>&lt;<span class="ty">User</span>&gt;</pre>
      </div>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>Pick &amp; Omit — the most useful pair</h3>
        <p>Pick selects certain keys. Omit removes certain keys. You'll use these constantly to avoid duplicating interfaces.</p>
        <pre><span class="kw">interface</span> <span class="ty">User</span> {
  id: <span class="ty">number</span>; name: <span class="ty">string</span>; email: <span class="ty">string</span>; password: <span class="ty">string</span>
}

<span class="cm">// Omit — remove fields you don't want</span>
<span class="kw">type</span> <span class="ty">PublicUser</span> = <span class="ty">Omit</span>&lt;<span class="ty">User</span>, <span class="st">"password"</span>&gt;
<span class="cm">// { id: number; name: string; email: string }</span>

<span class="cm">// Pick — keep only the fields you want</span>
<span class="kw">type</span> <span class="ty">UserPreview</span> = <span class="ty">Pick</span>&lt;<span class="ty">User</span>, <span class="st">"id"</span> | <span class="st">"name"</span>&gt;
<span class="cm">// { id: number; name: string }</span></pre>
        <div class="insight"><strong>Real usage:</strong> You have a User with a password field. For any public-facing API response, use <code>Omit&lt;User, "password"&gt;</code> instead of creating a separate interface. Change User once — everything updates.</div>
        ${quiz('You have interface User with 10 fields including "password". Cleanest way to remove only "password"?',
          ['Pick<User, "password">', 'Omit<User, "password">', 'Partial<User>'], 1,
          'Omit<User, "password"> creates a new type with all User fields except "password". Pick would keep only the named field — the opposite of what you want.')}
      </div>

      <div class="card">
        <span class="card-label label-tip">Good to know</span>
        <h3>ReturnType — infer what a function returns</h3>
        <p>Instead of manually typing a function's return value, let TypeScript figure it out. If the function changes, everything updates automatically.</p>
        <pre><span class="kw">async function</span> fetchProduct(id: <span class="ty">number</span>) {
  <span class="kw">return</span> res.json() <span class="kw">as</span> <span class="ty">Promise</span>&lt;{ id: <span class="ty">number</span>; name: <span class="ty">string</span>; price: <span class="ty">number</span> }&gt;
}

<span class="cm">// ReturnType infers the return — stays in sync automatically</span>
<span class="kw">type</span> <span class="ty">FetchResult</span>  = <span class="ty">ReturnType</span>&lt;<span class="kw">typeof</span> fetchProduct&gt;
<span class="cm">// → Promise&lt;{ id: number; name: string; price: number }&gt;</span>

<span class="cm">// Awaited unwraps the Promise — gives you the inner type</span>
<span class="kw">type</span> <span class="ty">Product</span> = <span class="ty">Awaited</span>&lt;<span class="ty">ReturnType</span>&lt;<span class="kw">typeof</span> fetchProduct&gt;&gt;
<span class="cm">// → { id: number; name: string; price: number }</span>

<span class="cm">// Now use it in props — updates automatically if fetchProduct changes</span>
<span class="kw">interface</span> <span class="ty">ProductCardProps</span> {
  product: <span class="ty">Product</span>
}</pre>
      </div>`;
    }
  },

  // ── 7. Async & Promises ──────────────────────────────────
  {
    id: 'async',
    label: 'Async & Promises',
    render() {
      return `
      <p class="topic-eyebrow">Topic 07</p>
      <h1 class="topic-title">Async &amp; Promises</h1>
      <p class="topic-intro">
        In Next.js App Router, your pages are async functions. You fetch data at the top,
        use it in JSX below. No <code>useEffect</code>, no loading state management for
        server components. This is the fundamental server component pattern.
      </p>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>Promise&lt;T&gt; — the return type of async functions</h3>
        <p>When a function is <code>async</code>, it always returns a Promise. The return type wraps whatever you'd normally return.</p>
        <pre><span class="cm">// Regular function returns User directly</span>
<span class="kw">function</span> getUser(): <span class="ty">User</span> { ... }

<span class="cm">// Async function wraps it in a Promise</span>
<span class="kw">async function</span> fetchUser(id: <span class="ty">number</span>): <span class="ty">Promise</span>&lt;<span class="ty">User</span>&gt; {
  <span class="kw">const</span> res = <span class="kw">await</span> fetch(<span class="st">\`/api/users/\${id}\`</span>)
  <span class="kw">return</span> res.json()  <span class="cm">// TypeScript knows this resolves to User</span>
}

<span class="cm">// User might not exist — return null if not found</span>
<span class="kw">async function</span> findUser(id: <span class="ty">number</span>): <span class="ty">Promise</span>&lt;<span class="ty">User</span> | <span class="ty">null</span>&gt; {
  <span class="kw">const</span> users = <span class="kw">await</span> db.query(...)
  <span class="kw">return</span> users.find(u => u.id === id) ?? <span class="kw">null</span>
}</pre>
        <div class="insight"><strong>Simple rule:</strong> async function returns <code>Promise&lt;X&gt;</code>. When you <code>await</code> it, you get back <code>X</code>. The Promise wrapper is just the "eventually" container.</div>
      </div>

      <div class="card">
        <span class="card-label label-next">Next.js server component pattern</span>
        <h3>Your page IS an async function</h3>
        <p>This is the core pattern in Next.js App Router. Breaking it apart piece by piece:</p>
        <pre><span class="kw">export default async function</span> Page({ params }: { params: { id: <span class="ty">string</span> } }) {
  <span class="kw">const</span> user = <span class="kw">await</span> fetchUser(<span class="ty">Number</span>(params.id))
  <span class="kw">return</span> &lt;main&gt;{user?.name}&lt;/main&gt;
}</pre>
        <div class="tag-row">
          <span class="tag tag-purple">export default</span>
          <span class="tag tag-teal">async function</span>
          <span class="tag tag-coral">params.id</span>
          <span class="tag tag-blue">Number()</span>
        </div>
        <ul style="font-size:14px;color:var(--text2);line-height:2;padding-left:1.25rem;margin-top:.75rem">
          <li><code>export default</code> — Next.js needs this to identify the page</li>
          <li><code>async function</code> — server components can be async, so you await data directly</li>
          <li><code>{ params }</code> — Next.js passes route params automatically as props</li>
          <li><code>{ id: string }</code> — params are always strings from the URL</li>
          <li><code>Number(params.id)</code> — convert to number before passing to fetchUser</li>
          <li><code>user?.name</code> — optional chaining in case user is null</li>
        </ul>
        <div class="insight insight-teal">
          <strong>The big idea:</strong> In App Router, fetch data at the top of the component with <code>await</code>. No <code>useState</code>, no <code>useEffect</code>. The component suspends until the data is ready.
        </div>
      </div>

      <div class="card">
        <span class="card-label label-next">Next.js relevant</span>
        <h3>searchParams — why string | string[]?</h3>
        <pre><span class="cm">// Same key can appear once or multiple times in a URL</span>
<span class="cm">// /products?color=red              → color = "red"          (string)</span>
<span class="cm">// /products?color=red&color=blue   → color = ["red","blue"] (string[])</span>

<span class="kw">export default async function</span> Page({
  searchParams
}: {
  searchParams: <span class="ty">Record</span>&lt;<span class="ty">string</span>, <span class="ty">string</span> | <span class="ty">string</span>[]&gt;
}) {
  <span class="kw">const</span> color = searchParams.color

  <span class="cm">// Must handle both cases</span>
  <span class="kw">if</span> (<span class="ty">Array</span>.isArray(color)) {
    <span class="cm">// multiple colors selected</span>
  } <span class="kw">else</span> {
    <span class="cm">// single color</span>
  }
}</pre>
        ${quiz('What is the return type of: async function fetchUser(): Promise<User>?',
          ['User', 'Promise<User>', 'async<User>'], 1,
          'Any async function wraps its return value in a Promise. The return type is always Promise<T> where T is what the function eventually resolves to.')}
      </div>`;
    }
  },

  // ── 8. React Patterns ────────────────────────────────────
  {
    id: 'react',
    label: 'React Patterns',
    render() {
      return `
      <p class="topic-eyebrow">Topic 08</p>
      <h1 class="topic-title">React Patterns</h1>
      <p class="topic-intro">
        Props come from outside a component. State lives inside and can change.
        Refs point directly at HTML elements. These three ideas — plus event handlers —
        cover 90% of what you write in Next.js components.
      </p>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>Typing component props</h3>
        <p>Every React component in your Next.js app should have a typed Props interface. This is the pattern you'll write hundreds of times.</p>
        <pre><span class="kw">interface</span> <span class="ty">ButtonProps</span> {
  label: <span class="ty">string</span>                       <span class="cm">// required</span>
  onClick: () => <span class="ty">void</span>                 <span class="cm">// required — a function</span>
  variant?: <span class="st">"primary"</span> | <span class="st">"secondary"</span>  <span class="cm">// optional</span>
  disabled?: <span class="ty">boolean</span>                  <span class="cm">// optional</span>
  children?: <span class="ty">React.ReactNode</span>          <span class="cm">// anything renderable</span>
}

<span class="kw">export function</span> Button({ label, onClick, variant = <span class="st">"primary"</span>, disabled }: <span class="ty">ButtonProps</span>) {
  <span class="kw">return</span> (
    &lt;button onClick={onClick} className={variant} disabled={disabled}&gt;
      {label}
    &lt;/button&gt;
  )
}

<span class="cm">// Using it</span>
&lt;Button label=<span class="st">"Save"</span> onClick={handleSave} /&gt;
&lt;Button label=<span class="st">"Delete"</span> onClick={handleDelete} variant=<span class="st">"secondary"</span> /&gt;</pre>
      </div>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>useState — remembering values between renders</h3>
        <p>When a component re-renders, all its variables reset. <code>useState</code> is React's way of remembering a value across renders.</p>
        <pre><span class="cm">// Inferred — TypeScript sees 0 and knows it's number</span>
<span class="kw">const</span> [count, setCount] = useState(<span class="num">0</span>)

<span class="cm">// Explicit — initial value is null, so tell TypeScript the full type</span>
<span class="kw">const</span> [user, setUser] = useState&lt;<span class="ty">User</span> | <span class="ty">null</span>&gt;(<span class="kw">null</span>)
<span class="cm">// Without &lt;User | null&gt;, TypeScript infers type as just null</span>
<span class="cm">// and setUser(userObject) would be an error</span>

<span class="cm">// Array state — tell TypeScript what goes in the array</span>
<span class="kw">const</span> [items, setItems] = useState&lt;<span class="ty">string</span>[]&gt;([])</pre>
        <div class="insight"><strong>The rule:</strong> When the initial value makes the type obvious, let TypeScript infer it. When the initial value is <code>null</code> or <code>[]</code>, tell TypeScript the full type explicitly.</div>
        ${quiz('const [user, setUser] = useState(null) — what is the inferred type of user?',
          ['User | null', 'null', 'unknown'], 1,
          'TypeScript infers "null" from the initial value. That means setUser can only be called with null — you\'d never be able to set a User object. You need useState<User | null>(null).')}
      </div>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>Event handler types</h3>
        <p>Form events, click handlers, change handlers — all need specific event types. These are the ones you'll look up most when starting out.</p>
        <pre><span class="cm">// Click event</span>
<span class="kw">const</span> handleClick = (e: <span class="ty">React.MouseEvent</span>&lt;<span class="ty">HTMLButtonElement</span>&gt;) => {
  e.preventDefault()
}

<span class="cm">// Input change — this is how you read what the user typed</span>
<span class="kw">const</span> handleChange = (e: <span class="ty">React.ChangeEvent</span>&lt;<span class="ty">HTMLInputElement</span>&gt;) => {
  setValue(e.target.value)  <span class="cm">// e.target.value is the current text</span>
}

<span class="cm">// Form submit</span>
<span class="kw">const</span> handleSubmit = (e: <span class="ty">React.FormEvent</span>&lt;<span class="ty">HTMLFormElement</span>&gt;) => {
  e.preventDefault()  <span class="cm">// stops page from reloading</span>
}</pre>
      </div>

      <div class="card">
        <span class="card-label label-tip">Good to know</span>
        <h3>useRef — pointing at a real DOM element</h3>
        <p>Sometimes you need to directly control an HTML element — like focusing an input programmatically. State can't do this. That's what <code>useRef</code> is for.</p>
        <pre><span class="kw">const</span> inputRef = useRef&lt;<span class="ty">HTMLInputElement</span>&gt;(<span class="kw">null</span>)

<span class="cm">// Connect it to an element in JSX</span>
&lt;input ref={inputRef} type=<span class="st">"text"</span> /&gt;

<span class="cm">// Now inputRef.current IS that HTML element</span>
<span class="cm">// But it starts as null — element might not be mounted yet</span>
inputRef.current?.focus()  <span class="cm">// ?.  = only call if not null</span>

<span class="cm">// Without ?. — crashes if element isn't mounted</span>
inputRef.current.focus()   <span class="cm">// ❌ dangerous</span></pre>
      </div>`;
    }
  },

  // ── 9. keyof & typeof ────────────────────────────────────
  {
    id: 'keyof',
    label: 'keyof & typeof',
    render() {
      return `
      <p class="topic-eyebrow">Topic 09</p>
      <h1 class="topic-title">keyof &amp; typeof</h1>
      <p class="topic-intro">
        <code>keyof</code> gives you a union of all property names in an interface.
        <code>typeof</code> infers a type from an existing value. Together they power safe
        getter patterns and let you derive types from runtime objects instead of
        maintaining them manually.
      </p>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>keyof — pull out all keys as a union</h3>
        <pre><span class="kw">interface</span> <span class="ty">User</span> { id: <span class="ty">number</span>; name: <span class="ty">string</span>; email: <span class="ty">string</span> }

<span class="cm">// keyof gives you a union of all property names</span>
<span class="kw">type</span> <span class="ty">UserKey</span> = <span class="kw">keyof</span> <span class="ty">User</span>
<span class="cm">// "id" | "name" | "email"</span>

<span class="cm">// Why is this useful? Build a safe getter</span>
<span class="kw">function</span> getField&lt;T, K <span class="kw">extends</span> <span class="kw">keyof</span> T&gt;(obj: T, key: K): T[K] {
  <span class="kw">return</span> obj[key]
}

getField(user, <span class="st">"name"</span>)   <span class="cm">// ✅ returns string</span>
getField(user, <span class="st">"id"</span>)     <span class="cm">// ✅ returns number</span>
getField(user, <span class="st">"age"</span>)    <span class="cm">// ❌ "age" is not a key of User</span></pre>
        <div class="insight">
          <strong>T[K]</strong> is "index access" — it gives you the type of property K on object T. So <code>User["name"]</code> = <code>string</code>, <code>User["id"]</code> = <code>number</code>. TypeScript looks it up for you.
        </div>
      </div>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>typeof — infer a type from a value</h3>
        <p>You already have the object. Why write the interface manually? <code>typeof</code> generates the type from the value automatically.</p>
        <pre><span class="kw">const</span> config = { apiUrl: <span class="st">"https://api.x.com"</span>, timeout: <span class="num">5000</span> }

<span class="cm">// typeof infers the type from the value</span>
<span class="kw">type</span> <span class="ty">Config</span> = <span class="kw">typeof</span> config
<span class="cm">// { apiUrl: string; timeout: number }</span>

<span class="cm">// Normal flow — type first, then value</span>
<span class="kw">interface</span> <span class="ty">Config</span> { apiUrl: <span class="ty">string</span>; timeout: <span class="ty">number</span> }
<span class="kw">const</span> config: <span class="ty">Config</span> = { apiUrl: <span class="st">"..."</span>, timeout: <span class="num">5000</span> }

<span class="cm">// typeof flow — value first, type derived</span>
<span class="kw">const</span> config = { apiUrl: <span class="st">"..."</span>, timeout: <span class="num">5000</span> }
<span class="kw">type</span> <span class="ty">Config</span> = <span class="kw">typeof</span> config  <span class="cm">// TypeScript figures it out</span></pre>
        <div class="insight"><strong>When to use typeof flow:</strong> Config objects, constants files, anything where the value is the source of truth and you want the type derived from it rather than maintained separately.</div>
      </div>

      <div class="card">
        <span class="card-label label-tip">Good to know</span>
        <h3>Combining keyof + typeof</h3>
        <p>This combo is used constantly in Next.js for typed route constants and config lookups.</p>
        <pre><span class="kw">const</span> ROUTES = {
  HOME: <span class="st">"/"</span>,
  DASHBOARD: <span class="st">"/dashboard"</span>,
  PROFILE: <span class="st">"/profile"</span>
} <span class="kw">as const</span>  <span class="cm">// locks values as exact string literals</span>

<span class="cm">// keyof typeof gives you the union of keys</span>
<span class="kw">type</span> <span class="ty">RouteKey</span> = <span class="kw">keyof typeof</span> ROUTES
<span class="cm">// "HOME" | "DASHBOARD" | "PROFILE"</span>

<span class="cm">// Index access gives you the union of values</span>
<span class="kw">type</span> <span class="ty">Route</span> = (<span class="kw">typeof</span> ROUTES)[<span class="kw">keyof typeof</span> ROUTES]
<span class="cm">// "/" | "/dashboard" | "/profile"</span>

<span class="kw">function</span> navigate(route: <span class="ty">Route</span>) { ... }
navigate(<span class="st">"/dashboard"</span>)  <span class="cm">// ✅</span>
navigate(<span class="st">"/random"</span>)     <span class="cm">// ❌ not a valid route</span></pre>
        ${quiz('What does keyof User return when User has id, name, email?',
          ['"id" | "name" | "email"', 'string', 'number | string'], 0,
          'keyof gives you a union of all the property names as string literals. keyof User = "id" | "name" | "email". It stays in sync automatically if you add fields.')}
      </div>`;
    }
  },

  // ── 10. Advanced Patterns ────────────────────────────────
  {
    id: 'advanced',
    label: 'Advanced Patterns',
    render() {
      return `
      <p class="topic-eyebrow">Topic 10</p>
      <h1 class="topic-title">Advanced Patterns</h1>
      <p class="topic-intro">
        Three patterns you'll encounter in real Next.js codebases:
        <code>as const</code> for locking literal types,
        type guards for safely handling unknown data,
        and template literal types for building string types dynamically.
      </p>

      <div class="card">
        <span class="card-label label-next">Next.js relevant</span>
        <h3>as const — lock values as exact literals</h3>
        <p>Without <code>as const</code>, TypeScript widens string values to just <code>string</code>. With it, the exact string is preserved.</p>
        <pre><span class="cm">// Without as const — TypeScript sees { HOME: string }</span>
<span class="kw">const</span> ROUTES = { HOME: <span class="st">"/"</span>, DASHBOARD: <span class="st">"/dashboard"</span> }

<span class="cm">// With as const — TypeScript sees { HOME: "/", DASHBOARD: "/dashboard" }</span>
<span class="kw">const</span> ROUTES = {
  HOME: <span class="st">"/"</span>,
  DASHBOARD: <span class="st">"/dashboard"</span>,
  PROFILE: <span class="st">"/profile"</span>
} <span class="kw">as const</span>

<span class="cm">// Now you can derive a type from the values</span>
<span class="kw">type</span> <span class="ty">Route</span> = (<span class="kw">typeof</span> ROUTES)[<span class="kw">keyof typeof</span> ROUTES]
<span class="cm">// "/" | "/dashboard" | "/profile"</span>

<span class="kw">function</span> navigate(route: <span class="ty">Route</span>) {
  window.location.href = route
}
navigate(<span class="st">"/dashboard"</span>)  <span class="cm">// ✅</span>
navigate(<span class="st">"/nowhere"</span>)    <span class="cm">// ❌ compile error</span></pre>
      </div>

      <div class="card">
        <span class="card-label label-core">Must know</span>
        <h3>Type guards — safely handle unknown data</h3>
        <p>When you fetch data from an API, TypeScript has no idea what shape it is. A type guard is a function that checks the shape at runtime and tells TypeScript what it is.</p>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h4>Unsafe — lying to TypeScript</h4>
            <pre style="font-size:12px;padding:.75rem"><span class="kw">const</span> data = <span class="kw">await</span> fetch(<span class="st">"/api/user"</span>)
  .then(r => r.json())

<span class="cm">// Casting — just lying</span>
<span class="kw">const</span> user = data <span class="kw">as</span> <span class="ty">User</span>
<span class="cm">// No runtime check
// Will crash if data isn't User</span></pre>
          </div>
          <div class="compare-col good">
            <h4>Safe — type guard</h4>
            <pre style="font-size:12px;padding:.75rem"><span class="kw">function</span> isUser(v: <span class="ty">unknown</span>): v <span class="kw">is</span> <span class="ty">User</span> {
  <span class="kw">return</span> <span class="kw">typeof</span> v === <span class="st">"object"</span>
    && v !== <span class="kw">null</span>
    && <span class="st">"id"</span> <span class="kw">in</span> v
    && <span class="st">"name"</span> <span class="kw">in</span> v
}
<span class="cm">// Actually checks at runtime</span></pre>
          </div>
        </div>
        <pre><span class="cm">// Using the type guard</span>
<span class="kw">const</span> data: <span class="ty">unknown</span> = <span class="kw">await</span> fetch(<span class="st">"/api/user"</span>).then(r => r.json())

<span class="kw">if</span> (isUser(data)) {
  console.log(data.name)  <span class="cm">// ✅ TypeScript knows it's User here</span>
} <span class="kw">else</span> {
  console.error(<span class="st">"Unexpected response shape"</span>)
}</pre>
        <div class="insight"><strong>The <code>value is User</code> return type</strong> is called a type predicate. It tells TypeScript: "if this function returns true, treat the argument as User in the calling scope." Without it, TypeScript wouldn't narrow inside the if block.</div>
        ${quiz('What does "value is User" mean in a function\'s return type?',
          ['It returns the User type', 'It\'s a type predicate — narrows the type to User when the function returns true', 'It checks if value extends User'], 1,
          '"value is User" is a type predicate. It tells TypeScript: if this function returns true, safely treat "value" as a User in the calling scope.')}
      </div>

      <div class="card">
        <span class="card-label label-tip">Nice to know</span>
        <h3>Template literal types</h3>
        <p>TypeScript can build string types dynamically — useful for typed route strings and event names.</p>
        <pre><span class="kw">type</span> <span class="ty">EventName</span> = <span class="st">"click"</span> | <span class="st">"focus"</span> | <span class="st">"blur"</span>
<span class="kw">type</span> <span class="ty">Handler</span>   = <span class="st">\`on\${Capitalize&lt;EventName&gt;}\`</span>
<span class="cm">// "onClick" | "onFocus" | "onBlur"</span>

<span class="kw">type</span> <span class="ty">ApiRoute</span> = <span class="st">\`/api/\${string}\`</span>
<span class="kw">const</span> route: <span class="ty">ApiRoute</span> = <span class="st">"/api/users"</span>  <span class="cm">// ✅</span>
<span class="kw">const</span> bad: <span class="ty">ApiRoute</span>   = <span class="st">"/users"</span>      <span class="cm">// ❌ must start with /api/</span></pre>
      </div>

      <div class="card" style="border-color:rgba(52,211,153,0.3);background:var(--teal-dim)">
        <h3 style="color:var(--teal)">You've covered everything.</h3>
        <p>Here's the complete mental model for TypeScript in Next.js:</p>
        <pre style="background:var(--bg2)"><span class="cm">// What you now know:</span>

<span class="kw">interface</span>    <span class="cm">→ shape of an object (props, API responses)</span>
<span class="kw">type</span>         <span class="cm">→ unions, combinations, aliases</span>
<span class="kw">generic</span>&lt;T&gt;  <span class="cm">→ reusable type slot (ApiResponse&lt;User&gt;)</span>
<span class="kw">Partial</span>     <span class="cm">→ all fields optional</span>
<span class="kw">Omit</span>        <span class="cm">→ remove fields</span>
<span class="kw">Pick</span>        <span class="cm">→ keep only certain fields</span>
<span class="kw">ReturnType</span>  <span class="cm">→ infer what a function returns</span>
<span class="kw">keyof</span>       <span class="cm">→ union of all keys</span>
<span class="kw">typeof</span>      <span class="cm">→ type from a value</span>
<span class="kw">as const</span>    <span class="cm">→ lock string literals</span>
<span class="kw">is</span> Type     <span class="cm">→ type predicate (type guard)</span>
<span class="kw">Promise</span>&lt;T&gt; <span class="cm">→ async return type</span>
<span class="kw">Awaited</span>&lt;T&gt; <span class="cm">→ unwrap a Promise type</span></pre>
      </div>`;
    }
  }
];

// ── Helper: quiz renderer ──────────────────────────────────
function quiz(question, options, correctIndex, feedback) {
  const id = 'q' + Math.random().toString(36).slice(2, 8);
  return `
  <div class="quiz-box">
    <p class="quiz-q">Quick check: ${question}</p>
    <div class="quiz-opts">
      ${options.map((opt, i) => `
        <button class="quiz-opt" onclick="checkAnswer('${id}', ${i}, ${correctIndex})">${opt}</button>
      `).join('')}
    </div>
    <div class="quiz-fb" id="${id}-fb">${feedback}</div>
  </div>`;
}
