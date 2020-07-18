function onConvertClicked() {
    document.getElementById("pig-latin-txt").value = "";
    var lines = document.getElementById("original-txt").value.split('\n');

    for (var i = 0; i < lines.length; i++) {
        var letterCount = 0;
        var line = lines[i]

        while (letterCount < line.length) {
            if (line.charAt(letterCount) == '<') {
                var startOfTag = letterCount;
                while (letterCount < line.length && line.charAt(letterCount) != '>') {
                    letterCount++;
                }
                letterCount++;
                document.getElementById("pig-latin-txt").value += line.substring(startOfTag, letterCount);

            }

            if (letterCount >= line.length) {
                break;
            }

            if (line.charAt(letterCount) == '&') {
                var startOfMarker = letterCount;
                while (letterCount < line.length && line.charAt(letterCount) != ';') {
                    letterCount++;
                }
                letterCount++;
                document.getElementById("pig-latin-txt").value += line.substring(startOfMarker, letterCount);
            }

            if (letterCount >= line.length) {
                break;
            }

            if (line.charAt(letterCount) != '<' && line.charAt(letterCount) != '&') {
                var startOfTran = letterCount;
                while (letterCount < line.length && line.charAt(letterCount) != '<' && line.charAt(letterCount) != '&') {
                    letterCount++;
                }
                var translated = pigSentence(line.substring(startOfTran, letterCount));
                document.getElementById("pig-latin-txt").value += translated;
            }
        }
        document.getElementById("pig-latin-txt").value += "\n";

    }
}

function pigSentence(sentence) {
    var pigLatin = "";
    var letterCount = 0;
    while (letterCount < sentence.length) {
        while (letterCount < sentence.length && !relatedLetter(sentence.charAt(letterCount))) {
            pigLatin = pigLatin + sentence.charAt(letterCount);
            letterCount++;
        }

        if (letterCount >= sentence.length) {
            break;
        }

        var startOfWordPos = letterCount;
        while (letterCount < sentence.length && relatedLetter(sentence.charAt(letterCount))) {
            letterCount++;
        }

        var endOfWordPos = letterCount;
        var word = sentence.substring(startOfWordPos, endOfWordPos);

        if (firstVowel(sentence.substring(startOfWordPos, endOfWordPos)) == -1) {
            pigLatin = pigLatin + sentence.substring(startOfWordPos, endOfWordPos);
        } else {
            pigLatin = pigLatin + pigWord(sentence.substring(startOfWordPos, endOfWordPos));
        }

    }

    return pigLatin;

}

function pigWord(word) {
    var pigLatin = "";
    var vowelPos = firstVowel(word);

    if (vowelPos == 0) {
        pigLatin = word + "way";
    } else {
        var wordTilVowel = word.substring(vowelPos);
        var cost = word.substring(0, vowelPos);
        pigLatin = wordTilVowel + cost + "ay";
    }

    if (word.charAt(0) != word.charAt(0).toLowerCase) {
        pigLatin = pigLatin.substring(0, 1).toUpperCase() + pigLatin.substring(1).toLowerCase();
    }

    return pigLatin;

}


function firstVowel(word) {
    word = word.toLowerCase();
    if (word.charAt(0) != 'y') {
        for (var i = 0; i < word.length; i++) {
            if (word.charAt(i) == 'a' || word.charAt(i) == 'e' || word.charAt(i) == 'i' || word.charAt(i) == 'o' || word.charAt(i) == 'u' || word.charAt(i) == 'y') {
                return i;
            }
        }
    } else {
        for (var i = 0; i < word.length; i++) {
            if (word.charAt(i) == 'a' || word.charAt(i) == 'e' || word.charAt(i) == 'i' || word.charAt(i) == 'o' || word.charAt(i) == 'u') {
                return i;
            }
        }
    }

    return -1;
}

function relatedLetter(c) {
    return ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '\'');
}