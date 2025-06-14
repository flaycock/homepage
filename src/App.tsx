import type { FC } from "react";

import { Provider } from "./components/ui/provider";
import { TestComponent } from "./components/test-component/TestComponent";

export const App: FC = () => (
	<Provider>
		<div>
			<TestComponent text="Please check back for further updates." />
		</div>
	</Provider>
);
