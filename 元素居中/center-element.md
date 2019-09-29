### 元素居中问题  

#### 1. 水平居中  

##### 1.1 对于行内元素： 

直接设置其父元素的 `text-align: center;`  

##### 1.2 对于块级元素：  

1. 设置要居中的元素：`margin: 0 auto;`  

2. 设置要居中的元素为 `inline-block`，再设置父元素 `text-align: center;`

3. 设置居中的元素绝对定位，再使其 `left: 50%; transform: translateX(-50%);`

4. 设置父容器为弹性容器，并内容居中，`display: flex; justify-content: center;`
5. 设置父容器为弹性容器，`display: flex;` 要居中的元素：`margin: 0 auto;`

##### 1.3 多个块级元素同时并排居中：  

1. 设置父容器为弹性容器，并内容居中，`display: flex;justify-content: center;` 即可让多个元素并排居中（主轴方向）。
2. 设置要居中的元素为 `inline-block`，再设置父元素 `text-align: center;`

##### 1.4 对于浮动元素：  

1. 设置父容器为弹性容器，并内容居中，`display: flex; justify-content: center;`
2. 当元素宽度固定时：设置居中元素为**相对定位**，并且 `left: 50%; margin-left: 负值;`  

##### 1.5 对于绝对定位的元素：  

1. 设置要居中的元素为绝对定位，且 `margin: 0 auto；left: 0； right: 0;`  
  
  
#### 2. 垂直居中  

##### 2.1 单行内联元素：  

1. 设置父元素的 `height` 和 `line-height` 的值相等  

##### 2.2 多行内联元素：  

1. 利用 **flex 布局**，设置父元素 `display: flex; flex-direction: column; justify-content: center;` 即设置主轴方向为纵向。 

2. 利用 **表格布局**，设置父元素 `display：table;`, 子元素为 `display：table-cell; vertical-align: middle;`, 即父元素为表格，要居中的元素为单元格。  

##### 2.3 块级元素：  

1. 当要居中的元素 **宽高已知** 时，利用 `absolute + 负margin`：设置其为 **绝对定位**，且 `top：50%; margin-top：负值;`  

2. 当要居中的元素 **高度未知** 时，利用 `absolute + transform`：设置其为 **绝对定位**，且 `top：50%; transform: translateY(-50%);`  

3. 使用 **flex布局** + `align-items` 属性：设置父元素 `display: flex; align-items: center;`  

4. 使用 **表格布局**：`table-cell + vertical-align`：直接把父元素设为单元格再内容居中：`display: table-cell; vertical-align: middle;`  

#### 3. 水平垂直居中  

1. 当要居中元素 **已知宽高** 时：利用 `absolute + 负margin`：设置子元素为 **绝对定位**，且 `top: 50%; left: 50%; margin: 负px 0 0 负px;`  

2. 利用 `absolute + margin：auto`:（居中元素已知宽高，但无需利用）设置子元素 `absolute`，且上下左右值都为0，且 `margin：auto;`  

3. 当居中元素 **宽高未知** 时，利用 `absolute + transform`：设置**绝对定位**，且 `top: 50%; left: 50%; transform: translate(-50%,-50%);`  

4. flex 布局 ：设置父元素为 `flex` 且 `justify-content: center;  align-items: center;`  

5. 最简单写法：设置父元素为 `flex` 或 `grid` ，要居中的元素设置 `margin: auto;`  

