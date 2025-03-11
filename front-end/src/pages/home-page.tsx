import { PrivateComponent } from "../components/security/private-component";
import { DashboardLayout } from "../layouts/dashboard.layout";
function HomePage() {
  return (
    <PrivateComponent>
      <DashboardLayout>Hello</DashboardLayout>
    </PrivateComponent>
  );
}

export default HomePage;
