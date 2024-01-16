function operate (a, b, op) {
    a = parseFloat(a)
    b = parseFloat(b)
    switch(op) {
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/':
        if(parseInt(a / b) == a / b) {
            return a / b
        }
        else {
            return (a / b).toFixed(2)
        }
    }
}

const ops = document.querySelectorAll('.op')
const nums = document.querySelectorAll('.num')
const hist = document.querySelector('#hist')
const curr = document.querySelector('#curr')
const eq = document.querySelector('#eq')
const dec = document.querySelector('#dec')
const ac = document.querySelector('#ac')
const c = document.querySelector('#c')

let buf = []

ops.forEach((elt) => {
    elt.addEventListener('click', () => {
        if(buf[buf.length - 2] == '.') {
            let second = buf.pop()
            buf.pop()
            let first = buf.pop()
            buf.push(parseFloat(first + '.' + second))
        }

        if(buf[0] == '=') {
            const result = buf[1]
            buf = [result, elt.textContent]
            curr.textContent = result
            hist.textContent = result + ' ' + elt.textContent
        }
        else if(buf.length == 0) {
            hist.textContent = ''
            curr.textContent = '0'
            buf.push('0')
            buf.push(elt.textContent)
            hist.textContent += buf[buf.length - 2] + ' ' + elt.textContent
        }
        else if(buf[buf.length - 2] == '+' || buf[buf.length - 2] == '-' || buf[buf.length - 2] == '*' || buf[buf.length - 2] == '/') {
            const result = operate(buf[buf.length - 3], buf[buf.length - 1], buf[buf.length - 2])
            hist.textContent = result + ' ' + elt.textContent
            buf = [result, elt.textContent]
            curr.textContent = result
        }
        else if(!isNaN(buf[buf.length - 1])) {
            buf.push(elt.textContent)
            hist.textContent += buf[buf.length - 2] + ' ' + elt.textContent
        }
        else if(buf[buf.length - 1] == '+' || buf[buf.length - 1] == '-' || buf[buf.length - 1] == '*' || buf[buf.length - 1] == '/') {
            buf.pop()
            buf.push(elt.textContent)
            hist.textContent = hist.textContent.slice(0, hist.textContent.length - 1) + elt.textContent
        }
    })
})

nums.forEach((elt) => {
    elt.addEventListener('click', () => {
        if(buf[buf.length - 1] == '.') {
            buf.push(elt.textContent)
            curr.textContent += elt.textContent
        }
        else if(elt.textContent == '0' && (buf.length == 0 || buf[buf.length - 1] == '0' || buf[0] == '=')) {
            buf = []
            hist.textContent = ''
            curr.textContent = '0'
        }
        else if(buf.length == 0 || buf[0] == '=') {
            buf = []
            hist.textContent = ''
            buf.push(elt.textContent)
            curr.textContent = elt.textContent
        }
        else if(!isNaN(buf[buf.length - 1])) {
            let hasDec = false
            curr.textContent.split('').forEach((elt) => {
                if(elt == '.') {
                    hasDec = true
                }
            })
            let lastNum = buf.pop()
            lastNum += elt.textContent
            buf.push(lastNum)
            if(hasDec) {
                curr.textContent = buf[buf.length - 3] + '.' + lastNum
            }
            else {
                curr.textContent = lastNum
            }             
        }
        else if(buf[buf.length - 1] == '+' || buf[buf.length - 1] == '-' || buf[buf.length - 1] == '*' || buf[buf.length - 1] == '/') {
            buf.push(elt.textContent)
            curr.textContent = elt.textContent
        }
    })
})

eq.addEventListener('click', () => {
    if(buf[buf.length - 2] == '.') {
        let second = buf.pop()
        buf.pop()
        let first = buf.pop()
        buf.push(first + '.' + second)
    }

    if(buf[buf.length - 2] == '+' || buf[buf.length - 2] == '-' || buf[buf.length - 2] == '*' || buf[buf.length - 2] == '/') {
        const result = operate(buf[buf.length - 3], buf[buf.length - 1], buf[buf.length - 2])
        hist.textContent += ' ' + buf[buf.length - 1] + ' = ' + result
        buf = ['=', result]
        curr.textContent = result
    }
})

ac.addEventListener('click', () => {
    buf = []
    curr.textContent = '0'
    hist.textContent = ''
})

c.addEventListener('click', () => {
    let num = buf[buf.length - 1]
    if(!isNaN(num)) {
        if(num > 0 && num < 10) {
            buf.pop()
            curr.textContent = '0'
        }
        else if(num >= 10) {
            let prev = buf.pop()
            let now = prev.slice(0, prev.length - 1)
            buf.push(now)
            curr.textContent = now
        }
    }
    else if(num == '.') {
        buf.pop()
        curr.textContent = curr.textContent.slice(0, curr.textContent.length - 1)
        if(buf[0] == '0') {
            buf.pop()
        }
    }
})

dec.addEventListener('click', () => {
    let hasDec = false
    curr.textContent.split('').forEach((elt) => {
        if(elt == '.') {
            hasDec = true
        }
    })
    if(hasDec) {}
    else if(buf.length == 0 || buf[0] == '=') {
        buf.push('0')
        buf.push('.')
        curr.textContent = '0.'
    }
    else if(!isNaN(buf[buf.length - 1])) {
        buf.push('.')
        curr.textContent += '.'
    }
})