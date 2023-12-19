import { TypeormDatabase } from "@subsquid/typeorm-store";
import { Inscription } from "./model";
import { processor } from "./processor";
import { isValidDataUri, hexToUTF8 } from "./utils";
processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const knownInscriptionsArray: Inscription[] = await ctx.store.find(
    Inscription,
    { where: { isEsip6: false } }
  );
  const knownInscriptions: Map<string, Inscription> = new Map(
    knownInscriptionsArray.map((c) => [c.data, c])
  );
  const newUniqueInscriptions: Map<string, Inscription> = new Map();
  const inscriptions: Inscription[] = [];

  for (let c of ctx.blocks) {
    for (let tx of c.transactions) {
      // decode and normalize the tx data
      if (tx.to) {
        //is unique or has rule=esip6

        const decodedData = hexToUTF8(tx.input);
        //console.log(decodedData);
        if (isValidDataUri(decodedData)) {
          if (decodedData.includes("rule=esip6")) {
            console.log("esip6");
            inscriptions.push(
              new Inscription({
                id: tx.hash,
                data: decodedData,
                block: c.header.height,
                creator: tx.from,
                isEsip6: true,
              })
            );
          } else if (
            !knownInscriptions.has(decodedData) &&
            !newUniqueInscriptions.has(decodedData)
          ) {
            //console.log("new");
            console.log(decodedData);
            newUniqueInscriptions.set(
              decodedData,
              new Inscription({
                id: tx.hash,
                data: decodedData,
                block: c.header.height,
                creator: tx.from,
                isEsip6: false,
              })
            );
          }
          //checkuniquesness
        }
      }
    }
  }

  // upsert batches of entities with batch-optimized ctx.store.save
  await ctx.store.insert(inscriptions);
  if (newUniqueInscriptions.size > 0) {
    await ctx.store.insert([...newUniqueInscriptions.values()]);
  }
});
