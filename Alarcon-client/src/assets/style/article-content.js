const articles = [
  {
    name: "react-props-and-styling",
    title: "FRENCH PARKER SHIRT",
    image: "/src/assets/galdept/galdept.jpg",
    content: [
      "French Parker shirt designed with a boxy, wide fit and point collar.",
      "Example:\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}!<\/h1>;\n}\n",
      "React supports multiple styling approaches: inline styles, CSS files, CSS Modules, and styled-components.",
      "Inline Style Example:\nconst style = { color: 'blue' };\n<p style={style}>Styled Text<\/p>"
    ]
  },
  {
    name: "react-functional-components",
    title: "BRANKO CARPENTER SHORTS",
    image: "/src/assets/galdept/galdept2.jpg",
    content: [
      "Relaxed carpenter short with distressed detailing and a worn-in finish, created through our patented wash process.",
      "They are stateless by default but can use hooks like useState and useEffect.",
      "Example:\nfunction HelloWorld() {\n  return <h1>Hello, World!<\/h1>;\n}\n",
      "They are preferred in modern React apps for simplicity and performance."
    ]
  },
  {
    name: "react-component-lifecycle",
    title: "40-YEAR TEE",
    image: "/src/assets/galdept/galdept3.jpg",
    content: [
      "Relaxed 90’s fit short sleeve featuring layered ATK RECORDS graphics and black glitter GD ENGLISH typography.",
      "Key methods include: componentDidMount, componentDidUpdate, componentWillUnmount.",
      "Functional components use the useEffect hook to mimic lifecycle behavior.",
      "Example:\nuseEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n}, []);"
    ]
  },
  {
    name: "react-routing-basics",
    title: "RETOUCHE EVERGLADES VEST",
    image: "/src/assets/galdept/galdept4.jpg",
    content: [
      "Lightweight nylon vest made from up-cycled safety jackets",
      "Set up routes using BrowserRouter, Routes, and Route components.",
      "Example:\n<Routes>\n  <Route path=\"/\" element={<Home />} />\n  <Route path=\"/about\" element={<About />} />\n</Routes>",
      "Use Link component for navigation:\n<Link to=\"/about\">About<\/Link>"
    ]
  },
  {
    name: "react-state-management",
    title: "AI SWEATER",
    image: "/src/assets/galdept/galdept5.jpg",
    content: [
      "Relaxed crewneck sweatshirt with wide neckline, screen-printed jacket motif, and 'Art on Display' patch at cuff.",
      "useState hook lets functional components manage state.",
      "Example:\nconst [count, setCount] = useState(0);\n",
      "Updating state triggers a re-render with the new value."
    ]
  }
];

export default articles;
