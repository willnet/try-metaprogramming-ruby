// 多言語対応のための文字列定義
export const translations = {
  ja: {
    // ページタイトルとヘッダー
    pageTitle: 'メタプログラミングクイズ',
    
    // 問題選択部分
    sectionLabel: 'セクション:',
    problemLabel: '問題:',
    
    // 問題表示部分
    detailedSpecification: '詳細仕様',
    codeInput: 'コードを入力してください',
    
    // ボタン
    runTest: 'テスト実行',
    reset: 'リセット',
    showAnswer: '回答を表示',
    hideAnswer: '回答を非表示',
    
    // 回答表示部分
    answerAndExplanation: '回答例と解説',
    explanation: '解説',
    answerExample: '回答例',
    
    // テスト結果
    testResult: 'テスト結果',
    
    // メッセージ
    running: '実行中...',
    initError: '初期化エラー:',
    executionError: '実行エラー:',
    
    // 確認ダイアログ
    showAnswerConfirm: '回答例を表示しますか？\n\n先に自分で考えてみることをお勧めします。',
    resetConfirm: 'コードエディターをリセットしますか？\n\n入力した内容は失われます。',
    
    // 回答がない場合のメッセージ
    noExplanation: '解説はありません。',
    noAnswer: '回答例はありません。',
    
    // 言語切り替え
    language: '言語',
    japanese: '日本語',
    english: 'English',
    
    // ナビゲーション
    aboutLink: 'About'
  },
  
  en: {
    // ページタイトルとヘッダー
    pageTitle: 'Ruby Metaprogramming Quiz',
    
    // 問題選択部分
    sectionLabel: 'Section:',
    problemLabel: 'Problem:',
    
    // 問題表示部分
    detailedSpecification: 'Detailed Specification',
    codeInput: 'Enter your code here',
    
    // ボタン
    runTest: 'Run Test',
    reset: 'Reset',
    showAnswer: 'Show Answer',
    hideAnswer: 'Hide Answer',
    
    // 回答表示部分
    answerAndExplanation: 'Answer Example and Explanation',
    explanation: 'Explanation',
    answerExample: 'Answer Example',
    
    // テスト結果
    testResult: 'Test Result',
    
    // メッセージ
    running: 'Running...',
    initError: 'Initialization Error:',
    executionError: 'Execution Error:',
    
    // 確認ダイアログ
    showAnswerConfirm: 'Do you want to show the answer example?\n\nWe recommend trying to solve it yourself first.',
    resetConfirm: 'Do you want to reset the code editor?\n\nYour current input will be lost.',
    
    // 回答がない場合のメッセージ
    noExplanation: 'No explanation available.',
    noAnswer: 'No answer example available.',
    
    // 言語切り替え
    language: 'Language',
    japanese: '日本語',
    english: 'English',
    
    // ナビゲーション
    aboutLink: 'About'
  }
};

// 言語管理クラス
export class LanguageManager {
  constructor() {
    this.currentLanguage = this.loadLanguage();
    this.callbacks = [];
  }
  
  // ローカルストレージから言語設定を読み込み
  loadLanguage() {
    const saved = localStorage.getItem('app-language');
    return saved && ['ja', 'en'].includes(saved) ? saved : 'en';
  }
  
  // 言語設定をローカルストレージに保存
  saveLanguage(language) {
    localStorage.setItem('app-language', language);
  }
  
  // 現在の言語を取得
  getCurrentLanguage() {
    return this.currentLanguage;
  }
  
  // 言語を設定
  setLanguage(language) {
    if (!['ja', 'en'].includes(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }
    
    this.currentLanguage = language;
    this.saveLanguage(language);
    
    // コールバック関数を実行
    this.callbacks.forEach(callback => callback(language));
  }
  
  // 言語変更時のコールバック関数を登録
  onLanguageChange(callback) {
    this.callbacks.push(callback);
  }
  
  // 翻訳文字列を取得
  t(key) {
    const translation = translations[this.currentLanguage];
    return translation[key] || key;
  }
  
  // 問題の表示言語に応じたフィールド名を取得
  getProblemField(baseField) {
    if (this.currentLanguage === 'en' && baseField !== 'problemCode' && baseField !== 'answerCode' && baseField !== 'testCode') {
      return `${baseField}_en`;
    }
    return baseField;
  }
}