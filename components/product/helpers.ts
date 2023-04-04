import { Product } from "@common/types/product";

type AvailableChoices = "color" | "size" | string;

export type Choices = {
  [P in AvailableChoices]: string;
};

export function getVariant(product: Product, choices: Choices) {
  {
    /*
     * Geht durch die einzelnen Varianten, und finde, welche meiner Auswahl entspricht den choices)
     * Geh in jede Option und schau ob der displayname und dessen Wert in choices vorkommt
     * NUR wenn beide choices zu den optionen passen, wird die every-Funktion true und die Variante wird zurückgegeben
     * falls nur eine oder keine choice ausgewählt ist, wird kein true returned und auch keine variante ausgewählt
     */
  }
  const variant = product.variants.find((variant) => {
    const isMatchingChoice = variant.options.every((variantOption) => {
      const optionName = variantOption.displayName.toLocaleLowerCase();

      if (optionName in choices) {
        if (choices[optionName] === variantOption.values[0].label) {
          return true;
        }
      }

      return false;
    });

    return isMatchingChoice;
  });

  return variant;
}
