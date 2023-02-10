addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    // Verify password
  const url = new URL(request.url)
  const pwd = url.searchParams.get('pwd')
  if (pwd !== 'password') {
    return new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized'
    })
  }
  // Check if the request method is POST
  if (request.method === 'POST') {
    // Get the user input from the form data
    const formData = await request.formData()
    const userInput = formData.get('userInput')

    // Send a request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-xxxxxxxxxxxxxx'
      },
      body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": userInput,
        "max_tokens": 1500,
        "temperature": 0.7,
        "top_p":0.9,
        "n":1
      })
    })

    // Get the API response
    const apiResponse = await response.json()

    // Return the HTML page with the API response
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
        <meta charset='utf-8'>
        <meta name='robots' content='noindex, nofollow' />
          <title>openai-starter</title>
        </head>
        <body>
          <h1>openai-starter</h1>
          <form action="" method="post">
            <textarea name="userInput" rows="4" cols="50"></textarea><br><br>
            <button type="submit">提交</button>
          </form>
          <h2>输入内容:</h2>
          <p>${userInput}</p>
          <h2>返回数据:</h2>
          <p>${apiResponse.choices[0].text}</p>
          <h2>数据使用情况:</h2>
          <p>输入:${apiResponse.usage.prompt_tokens}</p>
          <p>输出:${apiResponse.usage.completion_tokens}</p>
          <p>合计:${apiResponse.usage.total_tokens}</p>
          <p><script>
            let result = ${apiResponse.usage.total_tokens} * 0.00002;
            document.write("合计费用" + result + "USD");
          </script></p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    })
  } else {
    // Return the HTML page with the form
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
        <meta charset='utf-8'>
        <meta name='robots' content='noindex, nofollow' />
          <title>openai-starter</title>
        </head>
        <body>
          <h1>openai-starter</h1>
          <form action="" method="post">
            <textarea name="userInput" rows="4" cols="50"></textarea><br><br>
            <button type="submit">提交</button>
          </form>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    })
  }
}
