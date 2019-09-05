import mapValues from "@unction/mapvalues";
import objectFrom from "@unction/objectfrom";
import pipe from "@unction/pipe";
import get from "@unction/get";
import {has} from "ramda";
import rejectByValue from "@unction/rejectbyvalue";
import thenCatchP from "@unction/thencatchp";
import thenP from "@unction/thenp";
import allP from "@unction/allp";
import {ListType} from "./types";

const asResolved = objectFrom(["resolved"]);
const asRejected = objectFrom(["rejected"]);
const onlyResolved = rejectByValue(has("rejected"));
const resolvedValues = mapValues(get("resolved"));
const onlyResolvedValues = pipe([onlyResolved, resolvedValues]);

export default function optimisticP<A> (promises: ListType<Promise<A>>): Promise<ListType<A>> {
  return pipe([
    mapValues(thenCatchP(asResolved)(asRejected)),
    allP,
    thenP(onlyResolvedValues),
  ])(
    promises
  );
}
