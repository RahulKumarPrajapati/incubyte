class StringCalculator{
    constructor(){
        this.count = 0;
    }
    
    getCalledCount(){
        return this.count;
    }

    extractDelimiters(s) {
        // If there is only one delimiter
        if (!s.startsWith('[')) {
        return [s];
        }
    
        // For multiple delimiters enclosed in brackets
        const delimiters = [];
        const regex = /\[(.*?)\]/g;
        let match;
        while ((match = regex.exec(s)) !== null) {
        delimiters.push(match[1]);
        }
        return delimiters;
    }

    splitByDelimiters(s, delimiters) {
        // Escape special characters in delimiters to create a valid regex pattern
        const escapedDelimiters = delimiters.map(d => d.replace(/[-\/\\^$*+?.!@#%]/g, '\\$&'));
        // Join delimiters with '|' to create a single regex pattern for splitting
        const regexPattern = new RegExp(escapedDelimiters.join('|'), 'g');
        // Split the string using the constructed regex pattern
        const result = s.split(regexPattern);
        return result;
    }

    add(numbers){
        try{
            //Increasing count for every add function call
            this.count += 1;
            //If the number string is empty then return 0
            if(numbers == ""){
                return 0;
            }
            let delimiter_list = [];
            let numbers_list = [];
            let sum = 0
            //Check if string starts with //
            if(numbers.startsWith('//')){
                let first_new_line_index = numbers.indexOf('\n');
                delimiter_list = this.extractDelimiters(numbers.slice(2, first_new_line_index));
                numbers = numbers.slice(numbers.indexOf('\n') + 1);
                for(let line of numbers.split('\n')){
                    let list = this.splitByDelimiters(line, delimiter_list);
                    numbers_list.push(...list);
                }
            }
            // If string doesn't start with //
            else{
                for(let line of numbers.split('\n')){
                    let list = line.split(',');
                    numbers_list.push(...list);
                }
            }
            let negativeFound = false;
            let negativeMsg = "negative numbers not allowed ";
            for(let num of numbers_list){
                if(!negativeFound && parseInt(num) >= 0 && parseInt(num) <= 1000){
                    sum += parseInt(num);
                }
                else if(parseInt(num) < 0){
                    negativeFound = true;
                    negativeMsg += num + ","
                }
            }

            if(negativeFound){
                throw negativeMsg.slice(0, -1);
            }
            return sum;
        }
        catch(error){
            return error;
        }
    }
}
module.exports = StringCalculator;