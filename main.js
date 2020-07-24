'use strict';

////__ 文章変換
function sentenceConversion(sentence) {

}

const sentenceValue = document.querySelector('#sentenceValue');
const sentenceButton = document.querySelector('#sentence button');
const sentenceResult = document.querySelector('#sentenceResult');
const displayExampleSentence = document.querySelector('#displayExampleSentence');

sentenceButton.addEventListener('click', function () {

  let tempValu = sentenceValue.value;
  let tempValuCopy = tempValu;
  let wordArray = [];

  const regexString = /\p{sc=Han}{1,}\([\p{sc=Hiragana}]*\)/gu;
  let temp;
  let i = 0;
  while ((temp = regexString.exec(tempValu)) != null) {
    let splitWord, kanji, furigana, rubyWord;

    wordArray.push(temp[0]);
    splitWord = temp[0].split('(');
    kanji = splitWord[0];
    furigana = splitWord[1].replace(/\(/g, '').replace(/\)/g, '');
    rubyWord = '<ruby><rb>' + kanji + '</rb><rp>(</rp><rt>' + furigana + '</rt><rp>)</rp></ruby>';
    tempValuCopy = tempValuCopy.replace(wordArray[i], rubyWord);
    i++;
  }

  sentenceResult.value = tempValuCopy;
  displayExampleSentence.textContent = "";
  displayExampleSentence.insertAdjacentHTML('afterbegin', tempValuCopy);

});

// ボタンクリックでコピペ
function execCopy(string) {
  const tmp = document.createElement("div");
  const pre = document.createElement('pre');
  let s, result;

  // 親要素のCSSで user-select: none だとコピーできないので書き換える
  pre.style.webkitUserSelect = 'auto';
  pre.style.userSelect = 'auto';

  tmp.appendChild(pre).textContent = string;

  // 要素を画面外へ
  s = tmp.style;
  s.position = 'fixed';
  s.right = '200%';

  // body に追加
  document.body.appendChild(tmp);
  // 要素を選択
  document.getSelection().selectAllChildren(tmp);

  // クリップボードにコピー
  result = document.execCommand("copy");

  // 要素削除
  document.body.removeChild(tmp);

  return result;
}

let timerId;
const copyResultTxt = document.querySelector('#copyResultTxt');

// ボックスを表示して、タイマーを開始
function showBox() {
  copyResultTxt.style.display = "block"; // ボックスを表示
  timerId = setTimeout(closeBox, 500); // タイマーを開始
}
// ボックスを消して、タイマーを終了
function closeBox() {
  copyResultTxt.style.display = "none"; // ボックスを消す
  clearTimeout(timerId); // タイマーを終了
}

// const copyButton = document.querySelector('#word .copy');
const copyButton = document.querySelector('#sentence .copy');

copyButton.onclick = function () {
  if (execCopy(sentenceResult.value)) {
    copyResultTxt.innerText = "コピーできました";
    showBox();
  }
  else {
    copyResultTxt.innerText = "このブラウザでは対応していません";
    showBox();
  }
};

// リセット処理
function resetValu(id1, id2) {
  id1.value = '';
  id2.value = '';
  displayExampleSentence.textContent = "";
  return false;
}

const resetButton = document.querySelector('#sentence .reset');
resetButton.addEventListener('click', function () {
  resetValu(sentenceValue, sentenceResult);
});

