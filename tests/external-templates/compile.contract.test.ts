import {
  compileExternalTemplate,
  templateTestConfig,
  TEMPLATE_TEST,
} from "../utils/externalTemplate";

describe("External template compilation contract", () => {
  test("compiles the current producer source and satisfies its contract", () => {
    const { contract, reportPath } = templateTestConfig();
    const compiled = compileExternalTemplate({
      ...contract.input,
      notifyUrl: "http://127.0.0.1:9999" + reportPath,
      notifyAuthorization: "Bearer compile-only",
    });
    expect(typeof compiled.provenance.sourceDirty).toBe("boolean");
    expect(compiled.create).toMatchObject(contract.expectedCreate);
    expect(compiled.create.nodes.map((node) => node.id)).toEqual(
      contract.nodeIds,
    );
    expect(compiled.simulate.nodes).toEqual(compiled.create.nodes);
    expect(
      compiled.create.nodes.find((node) => node.id === contract.transferNodeId)
        ?.config,
    ).toMatchObject({
      runner: {
        type: "ethTransfer",
        config: { chainId: TEMPLATE_TEST.chainId },
      },
    });
    expect(compiled.create.edges).toEqual(
      expect.arrayContaining(
        contract.reportEdges.map((edge) => expect.objectContaining(edge)),
      ),
    );
  });
});
