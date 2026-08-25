const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  if(req.url === '/'){  
    res.write('<h1>Welcome to the User Management System</h1>');
    res.write('<p>Use the following endpoints:</p>');
    res.write('Calculator: <a href="/calculator">/calculator</a><br>');
  }else if(req.url === '/calculator' && req.method === 'GET'){
        res.write(` <form action="/calculate" method="post">
      <input type="number" name="num1" placeholder="Number 1" required> <br>
      <input type="number" name="num2" placeholder="Number 2" required> <br>
      <input type="submit" value="Calculate">
    </form>`)
  }else if(req.url === '/calculate' && req.method === 'POST'){
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
        const querystring = require('querystring');
      const { num1, num2 } = querystring.parse(body);
      const result = parseFloat(num1) + parseFloat(num2);
      res.write(`<h1>Result: ${result}</h1>`);
      res.end();
    });
  }else{  
    res.write(`Page Not Found`);
  }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
