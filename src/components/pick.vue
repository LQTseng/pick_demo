<template>
    <el-container>
        <div class="search-bar">
            <el-input v-model.trim="query" placeholder="请输入拣货单号" clearable>
                <template #append>
                    <el-button class="search-btn" @click="queryPickDetail">搜索</el-button>
                </template>
            </el-input>
        </div>
        <div class="wait-pick-list">
            <div class="title">待拣货订单</div>
        </div>
        <el-row>
            <el-col :span="6">
                <el-card shadow="never" :body-style="{ padding: '0px' }">
                    <template #header>
                        <strong>待拣货商品</strong>
                    </template>
                    <el-row
                        v-for="item in order.items"
                        :key="item.sku"
                        :gutter="20"
                        align="middle"
                        justify="space-between"
                    >
                        <el-col :span="6" :offset="1">
                            <el-image :src="item.pic" fit="cover"/>
                        </el-col>
                        <el-col :span="10">{{ item.name }}</el-col>
                        <el-col :span="6"><strong>{{ item.in_box_qty }}/{{ item.order_qty }}</strong></el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card shadow="never">
                    <el-descriptions title="订单信息">
                        <el-descriptions-item label="仓库：&emsp;&emsp;">{{ order.order_no }}</el-descriptions-item>
                        <el-descriptions-item label="商品数量：">{{ order.product_qty }}</el-descriptions-item>
                        <el-descriptions-item label="目的地：">{{ order.destination.join(' ') }}</el-descriptions-item>
                        <el-descriptions-item label="所属客户：" :span="3">{{ order.user }}</el-descriptions-item>
                        <el-descriptions-item label="备注：&emsp;&emsp;">{{ order.remark }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
                <el-card shadow="never">
                    <el-descriptions title="包裹装箱" :column="6" direction="vertical">
                        <template #extra>
                            <el-space>
                                <el-select v-model="box" placeholder="Select">
                                    <el-option
                                        v-for="box in order.boxes"
                                        :key="box.box_no"
                                        :label="box.box_no"
                                        :value="box"
                                    />
                                </el-select>
                                <el-input v-model="inputSKU" placeholder="请扫入SKU" @keyup.enter.native="checkSKU"
                                          clearable/>
                                <el-button color="#3A63F5" plain>选择商品</el-button>
                            </el-space>
                        </template>
                        <el-descriptions-item label="" align="center" min-width="100px">
                            <el-image src="" fit="cover"/>
                        </el-descriptions-item>
                        <el-descriptions-item label="商品">
                            Kuzuwata Japanese Temperament Gentle New Top Quality Women Dress Lace Flower Embroidery
                            Pullover Robe Loose Thin Long Vestidos
                        </el-descriptions-item>
                        <el-descriptions-item label="" align="center" min-width="150px">SKU</el-descriptions-item>
                        <el-descriptions-item label="箱号" align="center" min-width="120px">#1</el-descriptions-item>
                        <el-descriptions-item label="待装箱数量" align="center" min-width="150px">0/60</el-descriptions-item>
                        <el-descriptions-item label="本次装箱数量" min-width="180px">
                            <el-input placeholder="请输入数量" clearable/>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
                <el-card shadow="never">
                    <el-descriptions title="包裹装箱" border>
                        <el-descriptions-item label="1" label-class-name="index-label">
                            <el-descriptions :column="6" direction="vertical">
                                <el-descriptions-item label="" min-width="200px">
                                    <template #label><span class="required">*</span>箱体重量</template>
                                    <el-space>
                                        <el-input v-model="box.weight" placeholder="总重量">
                                            <template #append>KG</template>
                                        </el-input>
                                        <el-button type="primary" text>修改</el-button>
                                    </el-space>
                                </el-descriptions-item>
                                <el-descriptions-item label="长" min-width="120px">
                                    <el-space>
                                        <el-input v-model="box.length" placeholder="长">
                                            <template #append>CM</template>
                                        </el-input>
                                        <el-button type="primary" text>修改</el-button>
                                    </el-space>
                                </el-descriptions-item>
                                <el-descriptions-item label="宽" min-width="150px">
                                    <el-space>
                                        <el-input v-model="box.width" placeholder="宽">
                                            <template #append>CM</template>
                                        </el-input>
                                        <el-button type="primary" text>修改</el-button>
                                    </el-space>
                                </el-descriptions-item>
                                <el-descriptions-item label="高" min-width="150px">
                                    <el-space>
                                        <el-input v-model="box.height" placeholder="高">
                                            <template #append>CM</template>
                                        </el-input>
                                        <el-button type="primary" text>修改</el-button>
                                    </el-space>
                                </el-descriptions-item>
                                <el-descriptions-item label="体积重" align="center" min-width="120px">
                                    <strong>{{ calculate }}</strong>
                                </el-descriptions-item>
                                <el-descriptions-item label="计费重" align="center" min-width="100px">
                                    <strong>{{ compare }}</strong>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
                <el-card shadow="never">
                    <el-descriptions title="包裹装箱" border>
                        <template #extra>
                            <el-space>
                                <el-button color="#3A63F5" plain>多箱多个物流单号</el-button>
                                <el-button color="#3A63F5" plain>多箱一个物流单号</el-button>
                            </el-space>
                        </template>
                        <el-descriptions-item label="1" label-class-name="index-label">
                            <el-form inline label-position="top">
                                <el-form-item label="物流公司" :required="true">
                                    <el-select placeholder="#1">
                                        <el-option label="#1" value="#1"/>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="物流单号" :required="true">
                                    <el-input v-model="box.track_number" placeholder="请输入物流单号"/>
                                </el-form-item>
                            </el-form>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
        </el-row>
        <el-footer>
            <div class="fixed-bar">
                <el-button disabled>取消</el-button>
                <el-button disabled>打印单据</el-button>
                <el-button color="#3A63F5" plain>保存</el-button>
                <el-button color="#3A63F5">提交出库</el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    name: "pick",
    data() {
        return {
            query: '',
            pickDetail: {
                orders: []
            },
            order: {
                destination: [],
                items: [],
                boxes: []
            },
            box: {
                skus: []
            },
            inputSKU: '',
            calWeight: ''
        }
    },
    methods: {
        async queryPickDetail() {
            if (this.query) {
                let {data} = await this.$http.get('/pick.json')
                let res = JSON.parse(JSON.stringify(data))
                if (this.query === res.pick_no) {
                    this.pickDetail = res
                    this.order = res.orders[0]
                    this.box = res.orders[0].boxes[0]
                } else {
                    this.$message({message: '信息不存在！', type: 'error', showClose: true});
                }
            }
        },
        checkSKU() {
            let res = this.box.skus.some(item => {
                return item.sku === this.inputSKU
            })
            if (!res) {
                this.$message({message: 'SKU不存在！', type: 'error', showClose: true});
            }
        }
    },
    computed: {
        calculate() {
            let {length, width, height} = this.box
            this.calWeight = length * width * height / 6000
            return this.calWeight
        },
        compare() {
            return Math.max(this.calWeight, this.box.weight)
        }
    }
}
</script>

<style>
.index-label {
    width: 9vh;
    text-align: center !important;
    font-size: 2rem !important;
}
</style>

<style scoped>
.el-container {
    position: relative
}

.search-bar {
    width: 600px;
    margin: 40px auto;
}

.search-btn {
    color: white !important;
    background-color: #3A63F5 !important;
    border-color: #3A63F5 !important;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.wait-pick-list {
    border-top: 1px var(--el-border-color) var(--el-border-style);
}

.title {
    padding: 20px;
}

.el-container > .el-row {
    background-color: #EAEDEF;
    padding: 8px 5px;
}

.el-col-6 > .el-card {
    min-height: 60vh;
}

.el-card {
    margin: 12px 6px
}

.el-image {
    width: 50px;
    height: 54px;
    background: #EAEDEF;
}

.el-descriptions .el-descriptions {
    --el-descriptions-table-border: 0
}

.required {
    color: var(--el-color-danger);
    margin-right: 4px;
}

.el-footer {
    width: 100%;
    background: white;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    position: sticky;
    z-index: 1000;
    bottom: 0;
}
</style>