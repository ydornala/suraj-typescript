import express, { Express, Request, Response } from "express";

import { ethers } from "ethers";
import { InformationGetter, ERC721A } from "./typechain-types";
import InformationGetterABI from "./InformationGetter.json";
import MetaDrobeABI from "./Metadrobe.json";
import { UrnStuff } from "./generalStuff";
import { metadrobeMenHelper, metadrobeWomenHelper } from "./helperStuff";
import { singularHelpMen, singularHelpWomen } from "./singularHelper";

const womenCollection = "metadrobewomen";
const menCollection = "metadrobemen";



const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get(
  "/registry/:collectionMeme/address/:address/assets",
  async (req: Request, res: Response) => {
    const { address, id, collectionMeme } = req.params;
    try {
      if (womenCollection === collectionMeme) {
        const toSend = await metadrobeWomenHelper(address, womenCollection);
        res.send(JSON.stringify(toSend));
      } else if (menCollection === collectionMeme) {
        const toSend = await metadrobeMenHelper(address, menCollection);
        res.send(JSON.stringify(toSend));
      } else {
        res.send(
          JSON.stringify({
            address: address,
            assets: [],
            total: 0,
            page: 1,
            next: "",
          })
        );
      }
    } catch (err) {
      console.error(err);
      res.send(
        JSON.stringify({
          address: address,
          assets: [],
          total: 0,
          page: 1,
          next: "",
        })
      );
    }
  }
);

app.get(
  "/registry/:collectionName/address/:address/assets/:id",

  async (req: Request, res: Response) => {
    const { address, id, collectionName } = req.params;
    try {
      if (collectionName === womenCollection) {
        const toSend = await singularHelpWomen(id, womenCollection);
        res.send(JSON.stringify(toSend));
      } else if (collectionName === menCollection) {
        const toSend = await singularHelpMen(id, menCollection);
        res.send(JSON.stringify(toSend));
      } else {
        res.send(
          JSON.stringify({
            address: "0x4c1573189e308d0a4d8bec421082fa8e39eee58e",
            amount: 0,
            urn: {
              decentraland: "",
            },
          })
        );
      }
    } catch (err) {
      console.error(err);
      res.send(
        JSON.stringify({
          address: "0x4c1573189e308d0a4d8bec421082fa8e39eee58e",
          amount: 0,
          urn: {
            decentraland: "",
          },
        })
      );
    }
  }
);

app.listen(3306, () => {
  console.log(`[server]: Server is running at http://localhost:${3306}`);
});
