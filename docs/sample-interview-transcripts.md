# Sample Interview Transcripts

## Sample Interview 1: Beginner Level Candidate

**Candidate**: Sarah Johnson  
**Email**: sarah.johnson@email.com  
**Date**: July 25, 2025  
**Duration**: 16 minutes  
**Overall Score**: 6.8/10

### Interview Transcript

**AI Interviewer**: Welcome to the Excel Mock Interview! I'm your AI interviewer, and I'll be assessing your Excel skills today. Let's begin with the first question.

**Question 1 (Basic Operations - Beginner)**  
**AI**: How do you select all data in a worksheet quickly?

**Sarah**: I would press Ctrl+A to select everything on the worksheet. I think there's also a way to click somewhere to select all but I'm not sure exactly where.

**AI Evaluation**: Good answer! You correctly identified the primary keyboard shortcut Ctrl+A. The "somewhere to click" you mentioned is the intersection of the row and column headers (the blank rectangle in the top-left corner). **Score: 7/10**

**Question 2 (Formulas & Functions - Beginner)**  
**AI**: Explain the difference between VLOOKUP and HLOOKUP functions.

**Sarah**: VLOOKUP is for looking up values vertically in a column, and HLOOKUP is for looking up values horizontally in a row. VLOOKUP is more common. You use VLOOKUP when your lookup column is to the left of your data, and HLOOKUP when your lookup row is above your data.

**AI Evaluation**: Excellent explanation! You clearly understand the fundamental difference between these functions and when to use each one. You also correctly noted that VLOOKUP is more commonly used. **Score: 8.5/10**

**Question 3 (Data Analysis - Intermediate)**  
**AI**: How would you remove duplicate rows from a large dataset in Excel?

**Sarah**: I would use the Remove Duplicates feature. I think it's in the Data tab. You select your data first, then go to Data tab and click Remove Duplicates. Excel will show you a dialog where you can choose which columns to check for duplicates.

**AI Evaluation**: Very good answer! You correctly identified the Remove Duplicates feature and its location in the Data tab. You also mentioned the important step of selecting the data first and understanding the dialog options. **Score: 8/10**

**Question 4 (Pivot Tables - Intermediate)**  
**AI**: Describe the steps to create a basic pivot table from a data range.

**Sarah**: Um, I think you go to the Insert tab and click PivotTable. Then you select your data range if it's not already selected. Excel creates a new worksheet with the pivot table. On the right side, there's a field list where you can drag and drop fields to different areas like rows, columns, and values. I'm not super confident about all the details though.

**AI Evaluation**: Good understanding of the basic process! You correctly identified the Insert tab, PivotTable button, and the drag-and-drop field interface. Your uncertainty is honest - pivot tables do have many nuances that come with practice. **Score: 6.5/10**

**Question 5 (Problem Solving - Advanced)**  
**AI**: You have sales data for 12 months and need to calculate a rolling 3-month average for each month. How would you approach this in Excel?

**Sarah**: This sounds complicated. I think I would need to use some kind of AVERAGE function, but I'm not sure how to make it "rolling". Maybe I could use AVERAGE with cell references that change as I copy the formula down? Like AVERAGE of the current month and the two months before it? I'm not confident about this one.

**AI Evaluation**: You're on the right track with thinking about the AVERAGE function and changing cell references! A rolling average does indeed use AVERAGE with a moving range. You would use something like =AVERAGE(B2:B4) for the first 3-month period, then =AVERAGE(B3:B5) for the next, etc. Your logical thinking is good even though you lack the specific technical knowledge. **Score: 5/10**

### Performance Summary

**Overall Score**: 6.8/10 (Good)

**Category Breakdown**:
- Basic Operations: 7.0/10
- Formulas & Functions: 8.5/10  
- Data Analysis: 8.0/10
- Pivot Tables: 6.5/10
- Problem Solving: 5.0/10

**Strengths**:
- Strong understanding of basic Excel operations
- Good knowledge of fundamental functions like VLOOKUP
- Familiar with data cleaning tools
- Honest about knowledge limitations
- Logical problem-solving approach

**Areas for Improvement**:
- Advanced formula combinations and calculations
- Deeper pivot table functionality
- Complex problem-solving scenarios
- Rolling calculations and dynamic ranges

**Recommendations**:
- Practice creating pivot tables with different field arrangements
- Learn about advanced functions like INDEX-MATCH
- Study rolling calculations and moving averages
- Take an intermediate Excel course focusing on data analysis

---

## Sample Interview 2: Advanced Level Candidate

**Candidate**: Michael Chen  
**Email**: m.chen@techcorp.com  
**Date**: July 25, 2025  
**Duration**: 22 minutes  
**Overall Score**: 8.4/10

### Interview Transcript

**AI Interviewer**: Welcome to the Excel Mock Interview! I'm your AI interviewer, and I'll be assessing your Excel skills today. Let's begin with the first question.

**Question 1 (Basic Operations - Beginner)**  
**AI**: How do you select all data in a worksheet quickly?

**Michael**: There are several ways to select all data. Ctrl+A selects everything on the worksheet. If you want to select just the used range with data, you can use Ctrl+Shift+End after clicking on cell A1. You can also click the name box and type A1:XFD1048576 to select the entire worksheet, or click the intersection of row and column headers. For selecting just the current data region, Ctrl+Shift+* works well.

**AI Evaluation**: Outstanding answer! You provided multiple methods and explained the differences between selecting everything versus just the used range. Your knowledge of keyboard shortcuts and the name box technique shows advanced Excel skills. **Score: 10/10**

**Question 2 (Formulas & Functions - Intermediate)**  
**AI**: Compare VLOOKUP and INDEX-MATCH. When would you prefer one over the other?

**Michael**: INDEX-MATCH is generally superior to VLOOKUP for several reasons. First, INDEX-MATCH can look left or right since INDEX can return a value from any column, while VLOOKUP only looks to the right of the lookup column. Second, INDEX-MATCH is more efficient for large datasets because MATCH finds the position once, then INDEX retrieves the value directly, whereas VLOOKUP searches through columns each time. Third, if you insert columns in your data, INDEX-MATCH references stay correct while VLOOKUP column numbers break. However, VLOOKUP is simpler to write and understand for basic lookups, so I'd use it for simple cases and INDEX-MATCH for more complex scenarios.

**AI Evaluation**: Excellent comprehensive answer! You demonstrated deep understanding of both functions' strengths and weaknesses, including performance considerations and maintainability. Your explanation of when to use each shows practical Excel expertise. **Score: 9.5/10**

**Question 3 (Data Analysis - Advanced)**  
**AI**: How would you identify and handle outliers in a large dataset using Excel?

**Michael**: There are several statistical approaches to identify outliers in Excel. I'd typically use the IQR method first - calculate Q1 and Q3 using QUARTILE.INC function, then IQR = Q3-Q1. Outliers are values below Q1-1.5*IQR or above Q3+1.5*IQR. I'd create helper columns with these formulas to flag outliers. For visualization, I'd use box plots or scatter plots with conditional formatting to highlight outliers. For handling them, it depends on the context - you might exclude them with filtering, winsorize them by capping at percentile values, or investigate them individually. I'd also consider using z-scores for normal distributions - anything beyond ±2 or ±3 standard deviations might be an outlier.

**AI Evaluation**: Impressive statistical knowledge applied to Excel! You demonstrated understanding of multiple outlier detection methods (IQR, z-scores), proper Excel functions (QUARTILE.INC), and practical handling strategies. Your mention of visualization and context-dependent treatment shows advanced analytical thinking. **Score: 9/10**

**Question 4 (Pivot Tables - Advanced)**  
**AI**: How would you create a pivot table that shows year-over-year growth percentages for sales data?

**Michael**: I'd structure the source data with dates, and create a pivot table with dates grouped by year in the Rows area and sales values in the Values area. The key is to add the same sales field to Values twice - once for current year values and once for calculating the growth percentage. I'd modify the second field to "Show Values As" > "% Difference From" > "Previous" in the Field Settings. This automatically calculates year-over-year percentage change. Alternatively, I could use calculated fields with a formula like (Current Year - Previous Year) / Previous Year, or create a more complex setup with GETPIVOTDATA formulas outside the pivot table for more control over the calculation.

**AI Evaluation**: Excellent advanced pivot table knowledge! You showed understanding of the "Show Values As" feature and calculated fields. Your mention of GETPIVOTDATA for external calculations demonstrates sophisticated Excel skills. The multiple approaches show deep understanding of pivot table capabilities. **Score: 8.5/10**

**Question 5 (Problem Solving - Advanced)**  
**AI**: Design a dynamic dashboard that updates automatically when new sales data is added to your source table. What Excel features would you use?

**Michael**: I'd create a comprehensive solution using several Excel features. First, I'd structure the source data as an Excel Table (Ctrl+T) so it automatically expands when new data is added. For the dashboard, I'd use pivot tables and pivot charts that reference the table - they'll refresh automatically or with a simple Refresh All. I'd implement dynamic named ranges using OFFSET and COUNTA functions, or better yet, structured table references. For key metrics, I'd use formulas like SUMPRODUCT with dynamic criteria. I'd add slicers for interactivity and conditional formatting for visual appeal. To make it truly dynamic, I'd use VBA to auto-refresh pivot tables when the workbook opens, or set up automatic refresh intervals. For advanced users, I might also implement Power Query to clean and transform data before it hits the dashboard.

**AI Evaluation**: Outstanding comprehensive answer! You demonstrated mastery of Excel Tables, pivot functionality, dynamic ranges, advanced formulas, and even VBA automation. Your mention of Power Query shows knowledge of modern Excel features. This answer shows expert-level dashboard design thinking. **Score: 9/10**

### Performance Summary

**Overall Score**: 8.4/10 (Excellent)

**Category Breakdown**:
- Basic Operations: 10.0/10
- Formulas & Functions: 9.5/10
- Data Analysis: 9.0/10
- Pivot Tables: 8.5/10
- Problem Solving: 9.0/10

**Strengths**:
- Exceptional knowledge of Excel functions and features
- Understanding of advanced statistical concepts
- Practical experience with complex data analysis
- Knowledge of modern Excel features like Power Query
- Strong problem-solving and dashboard design skills
- Excellent communication of technical concepts

**Areas for Improvement**:
- Continue exploring Power BI integration possibilities
- Consider learning more advanced VBA programming
- Stay updated with latest Excel 365 features

**Recommendations**:
- Consider pursuing Microsoft Excel Expert certification
- Explore Power Platform tools (Power BI, Power Automate)
- Share knowledge by mentoring others or creating training materials
- Stay current with Excel new features and updates

---

## Sample Interview 3: Intermediate Level Candidate

**Candidate**: Lisa Rodriguez  
**Email**: lisa.r@consulting.com  
**Date**: July 25, 2025  
**Duration**: 19 minutes  
**Overall Score**: 7.2/10

### Interview Transcript

**AI Interviewer**: Welcome to the Excel Mock Interview! I'm your AI interviewer, and I'll be assessing your Excel skills today. Let's begin with the first question.

**Question 1 (Basic Operations - Beginner)**  
**AI**: How do you quickly navigate to the last row of data in a column?

**Lisa**: I would use Ctrl+Down arrow to jump to the last cell with data in the current column. If I'm starting from the top, I'd click on a cell in the column and then press Ctrl+Down. This skips all the empty cells and takes me directly to the last row with data.

**AI Evaluation**: Perfect answer! You correctly identified the keyboard shortcut and explained how it works. This shows good understanding of Excel navigation shortcuts. **Score: 9/10**

**Question 2 (Formulas & Functions - Intermediate)**  
**AI**: How would you count the number of cells that meet multiple criteria in Excel?

**Lisa**: I would use the COUNTIFS function for multiple criteria. For example, if I want to count rows where column A is greater than 100 AND column B equals "Yes", I would write =COUNTIFS(A:A,">100",B:B,"Yes"). Each pair of arguments represents a range and its criteria. You can add more pairs for additional criteria.

**AI Evaluation**: Excellent answer! You correctly identified COUNTIFS and provided a clear example with proper syntax. Your explanation of the paired arguments structure shows good understanding of the function. **Score: 9/10**

**Question 3 (Data Analysis - Intermediate)**  
**AI**: Explain how you would use conditional formatting to highlight duplicate values in a dataset.

**Lisa**: I would select the data range first, then go to Home tab > Conditional Formatting > Highlight Cells Rules > Duplicate Values. Excel will open a dialog where I can choose how to format the duplicates - maybe with a colored background or font. I can also choose to highlight unique values instead if needed. The formatting will automatically apply to any duplicates in the selected range.

**AI Evaluation**: Good answer! You correctly identified the location of the feature and the basic steps. You also mentioned the option to highlight unique values, which shows familiarity with the feature's flexibility. **Score: 7.5/10**

**Question 4 (Pivot Tables - Intermediate)**  
**AI**: What's the difference between putting a field in the Row area versus the Column area of a pivot table?

**Lisa**: When you put a field in the Row area, it creates different rows for each unique value in that field, with the data displayed vertically down the left side. When you put it in the Column area, it creates different columns for each unique value, with the data displayed horizontally across the top. So if I put "Product" in Rows, I get one row per product. If I put "Product" in Columns, I get one column per product. It's basically changing whether you want to see the breakdown vertically or horizontally.

**AI Evaluation**: Great explanation! You clearly understood the fundamental difference between row and column areas and explained it with a practical example. This shows good grasp of pivot table structure and layout options. **Score: 8/10**

**Question 5 (Problem Solving - Advanced)**  
**AI**: You need to create a summary report that automatically updates when new monthly data is added. How would you ensure your formulas always include the new data?

**Lisa**: I think I would use dynamic ranges for this. I could create named ranges that automatically expand when new data is added. I think there's a way to use OFFSET with COUNTA to make the range dynamic, but I'd need to look up the exact syntax. Another option might be to convert my data to an Excel table, because I think tables automatically expand when you add new rows. Then my formulas could reference the table columns instead of fixed cell ranges. I'm not 100% sure about the technical details, but I know there are ways to make ranges expand automatically.

**AI Evaluation**: Good conceptual understanding! You correctly identified two main approaches - dynamic named ranges with OFFSET/COUNTA and Excel Tables. While you're uncertain about specific syntax, your logical thinking is sound. Excel Tables are indeed the modern, easier solution for this problem. **Score: 6.5/10**

### Performance Summary

**Overall Score**: 7.2/10 (Good)

**Category Breakdown**:
- Basic Operations: 9.0/10
- Formulas & Functions: 9.0/10
- Data Analysis: 7.5/10
- Pivot Tables: 8.0/10
- Problem Solving: 6.5/10

**Strengths**:
- Solid foundation in Excel basics and navigation
- Good understanding of intermediate functions like COUNTIFS
- Familiar with pivot table concepts and layout options
- Knows about Excel Tables and dynamic ranges conceptually
- Clear communication of ideas

**Areas for Improvement**:
- Practice with dynamic range formulas (OFFSET, INDIRECT)
- More advanced conditional formatting scenarios
- Deeper exploration of pivot table calculated fields
- Complex problem-solving with multiple Excel features

**Recommendations**:
- Learn the syntax for OFFSET and COUNTA dynamic ranges
- Practice creating complex conditional formatting rules
- Explore pivot table calculated fields and items
- Work on projects that combine multiple Excel features
- Consider taking an advanced Excel course

---

*These sample transcripts demonstrate the AI interviewer's ability to assess candidates at different skill levels, provide appropriate feedback, and generate meaningful performance insights. The scoring system accurately reflects each candidate's Excel proficiency while offering constructive guidance for improvement.*
