import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 80001],
});
const Portis = new PortisConnector({
  dAppId: "729ed2b2-dee0-433e-b972-90895c77a17e",
  networks: [1, 5, 15001],
});

export { Injected, Portis };
