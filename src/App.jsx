import { useState, useCallback, useEffect } from 'react'

function App() {

  const [password, setPassword] = useState('password')
  const [length, setLength] = useState(6)
  const [num, setNum] = useState(false)
  const [char, setChar] = useState(false)

  const generatePassword = useCallback(() => {
    let Character = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let Number = '0123456789';
    let Special = '@#$%^&*~?/\\;:<>!';
    if (num) Character += Number;
    if (char) Character += Special;
    let pass = '';
    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * Character.length);
      pass += Character.charAt(index);
    }
    setPassword(pass)
  }, [length, num, char, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, num, char])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      alert('Password copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      <div className="bg-gray-900 flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 p-6 m-4 rounded-2xl shadow-lg max-w-md w-full">
          <div className="overflow-hidden rounded-lg flex mb-4">
            <input
              type="text"
              value={password}
              className="outline-none p-2 flex-grow bg-gray-700 text-white"
              readOnly
            />
            <button
              className="bg-blue-600 p-2 px-4 text-white hover:bg-blue-700 transition duration-300"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
          <div className="flex flex-wrap justify-between items-center text-white space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex-grow">
              <input
                type="range"
                name="length"
                id="length"
                min="4"
                max="20"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="length" className="">Length: {length}</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="number"
                id="number"
                checked={num}
                onChange={() => setNum(!num)}
                className="mr-2"
              />
              <label htmlFor="number">Number</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="char"
                id="char"
                checked={char}
                onChange={() => setChar(!char)}
                className="mr-2"
              />
              <label htmlFor="char">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
