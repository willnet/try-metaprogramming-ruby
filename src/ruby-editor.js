import { EditorView, basicSetup } from "codemirror";
import { StreamLanguage } from "@codemirror/language";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";

export class RubyEditor {
  constructor(textarea) {
    this.textarea = textarea;
    this.view = null;
    this.init();
  }

  init() {
    // textareaを非表示にして、CodeMirrorエディタで置き換える
    this.textarea.style.display = 'none';
    
    // CodeMirrorコンテナを作成
    const container = document.createElement('div');
    container.className = 'codemirror-container';
    this.textarea.parentNode.insertBefore(container, this.textarea);

    // エディタビューを作成
    this.view = new EditorView({
      doc: this.textarea.value,
      extensions: [
        basicSetup,
        StreamLanguage.define(ruby),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            // textareaの値を更新
            this.textarea.value = update.state.doc.toString();
            // inputイベントを発火させて既存のイベントリスナーと連携
            this.textarea.dispatchEvent(new Event('input', { bubbles: true }));
          }
        })
      ],
      parent: container
    });
  }

  setValue(value) {
    if (this.view) {
      this.view.dispatch({
        changes: {
          from: 0,
          to: this.view.state.doc.length,
          insert: value
        }
      });
    }
    this.textarea.value = value;
  }

  getValue() {
    return this.view ? this.view.state.doc.toString() : this.textarea.value;
  }

  focus() {
    if (this.view) {
      this.view.focus();
    }
  }

  destroy() {
    if (this.view) {
      this.view.destroy();
      this.textarea.style.display = '';
    }
  }
}
