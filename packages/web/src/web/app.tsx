import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Index from "./pages/index";
import RoadmapPage from "./pages/roadmap";
import PlannerPage from "./pages/planner";
import TrackPage from "./pages/track";
import ResourcesPage from "./pages/resources";
import RoboticsPage from "./pages/robotics";
import InterviewPage from "./pages/interview";
import MvaPage from "./pages/mva";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      {/* Hash routing: the site ships as static files on GitHub Pages, where
          there is no server to rewrite deep links back to index.html. */}
      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/roadmap" component={RoadmapPage} />
          <Route path="/planner" component={PlannerPage} />
          <Route path="/track/:id" component={TrackPage} />
          <Route path="/resources" component={ResourcesPage} />
          <Route path="/robotics" component={RoboticsPage} />
          <Route path="/interview" component={InterviewPage} />
          <Route path="/mva" component={MvaPage} />
          <Route component={Index} />
        </Switch>
      </Router>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
