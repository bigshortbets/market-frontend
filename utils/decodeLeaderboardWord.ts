function isHexEncodedWord(word: string): boolean {
  // Sprawdza, czy ciąg zaczyna się od "0x" i czy zawiera tylko cyfry szesnastkowe
  return /^0x[0-9a-fA-F]+$/.test(word);
}

function hexToUtf8(hex: string): string {
  // Usuń "0x" z początku
  hex = hex.slice(2);

  // Podziel hex na pary
  const bytes = hex.match(/.{1,2}/g);

  if (bytes === null) {
    throw new Error('Invalid hex string');
  }

  // Konwertuj pary na bajty
  const buffer = new Uint8Array(bytes.map((byte) => parseInt(byte, 16)));

  // Dekoduj bajty na UTF-8
  return new TextDecoder().decode(buffer);
}

export function decodeWord(word: string): string {
  // Sprawdź, czy ciąg jest zaszyfrowany w hex
  if (isHexEncodedWord(word)) {
    // Jeśli tak, zdekoduj go
    return hexToUtf8(word);
  } else {
    // W przeciwnym razie zwróć oryginalne słowo
    return word;
  }
}
