# 日本語

次の動作をする A2 class を実装する

- 1. "SmartHR Dev Team"と返すdev_teamメソッドが存在すること
- 2. initializeに渡した配列に含まれる値に対して、"hoge_" をprefixを付与したメソッドが存在すること
- 2で定義するメソッドは下記とする
  - 受け取った引数の回数分、メソッド名を繰り返した文字列を返すこと
  - 引数がnilの場合は、dev_teamメソッドを呼ぶこと
- また、2で定義するメソッドは以下を満たすものとする
  - メソッドが定義されるのは同時に生成されるオブジェクトのみで、別のA2インスタンスには（同じ値を含む配列を生成時に渡さない限り）定義されない

# English

Implement A2 class that behaves as follows

- 1. A dev_team method that returns "SmartHR Dev Team" exists
- 2. Methods with "hoge_" prefix are dynamically created for values passed to initialize
- Methods defined in step 2 should:
  - Return a string that repeats the method name the number of times specified by the argument
  - Call the dev_team method when the argument is nil
- Additionally, methods defined in step 2 should meet the following requirements:
  - Methods are defined only for the specific instance created, not for other A2 instances (unless the same array is passed during creation)