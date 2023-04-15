(() => {
	var __webpack_modules__ = {
			177: e => {
				e.exports = {
					n: function() {
						get({
							url: "user/change/password",
							data: {
								npw: $("#a_npw")
									.val(),
								opw: $("#a_opw")
									.val()
							},
							p: "account"
						}, (function(e) {
							alert(e.msg), getuserinfo(), 1 == e.code && (location.href = "")
						}))
					},
					l: function(e) {
						post({
							url: "user/change/info",
							data: {
								data: $("#i-input-" + e)
									.val(),
								t: e
							},
							p: "changeinfo"
						}, (function(e) {
							alert(e.msg), 1 == data.code && (location.href = "")
						}))
					},
					head: function() {
						v.detail.image ? post({
							url: "user/change/info",
							data: {
								data: v.detail.image,
								t: 2
							},
							p: "changeinfo"
						}, (function(e) {
							alert(e.msg), location.href = ""
						})) : alert("请选择图片并等待上传完毕后再继续操作")
					},
					update: function() {
						1 != v.waitRequest.cover ? (setCookie("newpage", v.account.newpage, 999), post({
							url: "user/info/update",
							data: {
								data: {
									image: v.detail.image,
									darkmode: v.detail.darkmode,
									nickname: $("#i-input-0")
										.val(),
									introduce: $("#i-input-1")
										.val()
								}
							},
							p: "changeinfo"
						}, (function(e) {
							alert(e.msg)
						}))) : alert("请选择图片并等待上传完毕后再继续操作")
					},
					edits: e => {
						let t = {};
						t[["", "nickname", "introduce"][e]] = $("#" + ["", "nnedit", "iedit"][e])
							.val(), post({
								url: "user/info/update",
								data: {
									data: t
								},
								p: "changeinfo"
							}, (function(e) {
								alert(e.msg), getuserinfo(), location.href += "&time=" + new Date / 1
							}))
					},
					newpage: getCookie("newpage")
				}
			},
			201: e => {
				e.exports = {
					send: function(e, t) {
						if (e) return void this.reply(e);
						let n = $("#comment")
							.val();
						n && post({
							url: "comment/",
							data: {
								comment: n,
								touser: 2 == v.comment.t[v.viewmode] ? v.studio.info.id : 3 == v.comment.t[v.viewmode] ? v.forum.post.text.id : v.workview.id,
								type: v.comment.t[v.viewmode]
							},
							p: "comment"
						}, (e => {
							v.comment.text.comment = "", console.log(e), alert("发送成功"), v.comment.getcomment()
						}))
					},
					showmore: e => {
						setTimeout(v.comment.b, 300), Vue.set(v.comment.comment.comment[e], "show", 1)
					},
					b: () => {
						viewer.update(), scratchblocks.renderMatching("code.language-scratch3,code.language-scratch-blocks", {
								style: "scratch3",
								languages: ["en"],
								scale: 1
							}), $("code.language-scratch3,code.language-scratch-blocks")
							.attr("class", "code")
					},
					getcomment: () => {
						Vue.set(v.comment, "comment", []), get({
							url: "comment/",
							data: {
								id: 2 == v.comment.t[v.viewmode] ? v.studio.info.id : 3 == v.comment.t[v.viewmode] ? v.forum.post.text.id : v.workview.id,
								type: v.comment.t[v.viewmode],
								l: 6,
								o: 6 * (v.comment.page - 1)
							}
						}, (e => {
							let t = e.data;
							Math.ceil(t.num / 6) < v.comment.page && 0 != t.num && (v.comment.page = Math.ceil(t.num / 6));
							for (let e in t.comment) t.comment[e].comment = markdownToHtml(t.comment[e].comment), t.comment[e].time = other.date(t.comment[e].time);
							for (let e in t.reply)
								for (let n in t.reply[e]) t.reply[e][n].comment = t.reply[e][n].comment ? markdownToHtml(t.reply[e][n].comment) : "", t.reply[e][n].time = other.date(t.reply[e][n].time);
							Vue.set(v.comment, "comment", t), setTimeout(v.comment.b, 300), console.log("获取评论", e)
						}))
					},
					delete: async function(e, t) {
						confirm("你确定要删除此评论吗? " + (t ? "" : "(你正在使用管理员权限)")) && post({
							url: "comment/delete",
							data: {
								id: e,
								type: v.comment.t[v.viewmode]
							},
							p: "commentdelete"
						}, (e => {
							console.log(e), alert("删除成功"), v.comment.getcomment()
						}))
					},
					deletereply: async function(e, t) {
						confirm("你确定要删除此评论吗? " + (t ? "" : "(你正在使用管理员权限)")) && post({
							url: "comment/reply/delete",
							data: {
								id: e,
								type: v.comment.t[v.viewmode]
							},
							p: "commentdelete"
						}, (e => {
							console.log(e), alert("删除成功"), v.comment.getcomment()
						}))
					},
					reply: e => {
						let t = $("#c-" + e)
							.val();
						t && post({
							url: "comment/reply",
							data: {
								comment: t,
								toid: e,
								type: v.comment.t[v.viewmode],
								torid: v.comment.rid
							},
							p: "comment" + e
						}, (t => {
							console.log(t), v.comment.text["c-" + e] = "", alert("发送成功"), v.comment.getcomment()
						}))
					},
					showreply: function(e, t) {
						Vue.set(v.comment, "replyid", e), v.comment.rid = t || null, setTimeout((() => {
							$("#c-" + v.comment.replyid)
								.unbind("paste"), $("#c-" + e)
								.bind("paste", v.paste)
						}), 10)
					},
					replyid: null,
					comment: {},
					text: {},
					page: 1,
					rid: null,
					t: {
						user: 0,
						work: 1,
						studio: 2,
						post: 3,
						myitem: 10
					}
				}
			},
			956: e => {
				e.exports = {
					list: [],
					studio: {},
					sending: 0,
					getlist: () => {
						get({
							url: "forum/list",
							data: {
								sid: getQueryString("sid"),
								page: getQueryString("p") || 1,
								name: getQueryString("name")
							}
						}, (e => {
							-1 != e.code ? (v.forum.list = e.data.list, v.forum.studio = e.data.studio, v.forum.user = e.data.user) : dialog(e.msg)
						}))
					},
					search: () => {
						location.href = "#page=forum&sid=" + getQueryString("sid") + "&name=" + v.forum.s
					},
					get: () => {
						get({
							url: "forum/post",
							data: {
								sid: getQueryString("sid"),
								page: getQueryString("page") || 1
							}
						}, (e => {
							-1 != e.code || dialog(e.msg)
						}))
					},
					send: () => {
						$("#ftitle")
							.val()
							.length < 3 || $("#fcontext")
							.val()
							.length < 3 ? alert("标题和正文必须大于2个字") : (v.forum.sending = 1, post({
								url: "forum/new",
								data: {
									title: $("#ftitle")
										.val(),
									context: $("#fcontext")
										.val(),
									sid: getQueryString("sid")
								}
							}, (function(e) {
								v.forum.sending = 0, v.forum.dialog = !1, location.href += "&t", alert(e.msg)
							})))
					},
					post: {
						text: {},
						studio: {},
						author: {},
						get: () => {
							get({
								url: "forum/post",
								data: {
									id: getQueryString("id")
								}
							}, (function(e) {
								v.forum.post.text = e.data.text, v.forum.post.text.context2 = markdownToHtml(v.forum.post.text.context), v.forum.post.studio = e.data.studio, v.forum.post.author = e.data.author, v.comment.getcomment()
							}))
						}
					},
					delete: () => {
						confirm("你确定要删除这个帖子吗") && post({
							url: "forum/delete",
							data: {
								id: getQueryString("id")
							}
						}, (function(e) {
							location.href = "#"
						}))
					}
				}
			},
			882: (module, __unused_webpack_exports, __webpack_require__) => {
				module.exports = {
					get: () => {
						get({
							url: "item/store"
						}, (e => {
							v.item.StoreItems = e.data
						})), get({
							url: "item/bag"
						}, (e => {
							v.item.BagItems = e.data
						}))
					},
					getBagItem: e => {
						get({
							url: "item/item",
							data: {
								id: e
							}
						}, (e => {
							v.item.dialog = e.data
						}))
					},
					getWorkItem: e => {
						try {
							e.options = JSON.parse(e.options)
						} catch (e) {}
						console.log(v.item.dialog = e)
					},
					getStoreItem: e => {
						v.item.dialog = {
							item: v.item.StoreItems[e]
						}, v.item.buynum = 1
					},
					buy: e => {
						post({
							url: "item/buy",
							data: {
								itemId: e,
								count: v.item.buynum
							},
							p: "itembuy"
						}, (e => {
							v.item.dialog = null, v.item.useinfo = 0, v.qh2()
						}))
					},
					use: e => {
						v.item.showbag = 0, v.item.useinfo = {
							id: e,
							template: __webpack_require__(953)[e] || {
								t: "确认使用-" + v.item.StoreItems[e] ?.name + "?"
							}
						}
					},
					tuse: id => {
						id && (v.item.useinfo = {
							id,
							template: __webpack_require__(953)[id] || {}
						}), post({
							url: "item/use",
							data: {
								itemId: v.item.useinfo.id,
								useid: 2 == v.comment.t[v.viewmode] ? v.studio.info.id : 3 == v.comment.t[v.viewmode] ? v.forum.post.text.id : v.workview.id,
								useto: v.comment.t[v.viewmode],
								options: v.item.useinfo.template.f && eval("(" + v.item.useinfo.template.f + ")")
							},
							p: "item"
						}, (e => {
							v.item.dialog = null, v.item.useinfo.template.a && dialog(v.item.useinfo.template.a), v.item.useinfo = 0, v.qh2()
						}))
					},
					getwork: e => {
						get({
							url: "item/work",
							data: {
								id: 2 == v.comment.t[v.viewmode] ? v.studio.info.id : 3 == v.comment.t[v.viewmode] ? v.forum.post.text.id : v.workview.id,
								useto: v.comment.t[v.viewmode]
							}
						}, (e => {
							v.item.workItems = e.data
						}))
					},
					useinfo: null,
					showbag: 0,
					buynum: 1,
					dialog: null,
					BagItems: [],
					workItems: [],
					StoreItems: []
				}
			},
			953: e => {
				e.exports = {
					0: {
						t: '\n        <div style="width:100%">若你作品中包含其他人的素材或代码，请在这里注明。<br>\n        若此作品非你原创，请使用转载声明</div>\n        <textarea rows="5" id="gyycdsm" class="s-input">说明</textarea>',
						f: '{descp:$("#gyycdsm").val()}'
					},
					1: {
						t: '请注明你作品的来源<br><br><br>\n        <textarea rows="5" id="sdfirf" class="s-input">说明</textarea>',
						f: '{descp:$("#sdfirf").val()}'
					},
					5: {
						t: "新手礼包",
						a: "你已获得：原创声明*1，转载声明*1，银元宝*1。<br>\n        "
					},
					6: {
						t: "初级精华作品大礼包",
						a: "你已获得：初级精华选票*8，金元宝*1。<br>\n        "
					},
					12: {
						t: '禁言时间<input id="jysj" class="s-input" value="1"></input>天',
						f: '{time:$("#jysj").val()}'
					}
				}
			},
			105: e => {
				e.exports = [{
					title: "我的主页",
					c: function() {
						location.href = "#page=user&id=" + v.detail.id
					}
				}, {
					title: "我的作品",
					c: function() {
						location.href = "#page=mywork"
					}
				}, {
					title: "我的工作室",
					c: function() {
						location.href = "#page=mystudio"
					}
				}, {
					title: "我的物品",
					c: function() {
						location.href = "#page=myitem"
					}
				}, {
					title: "账号设置",
					c: function() {
						location.href = "#page=account"
					}
				}, {
					title: "我的收藏",
					c: function() {
						location.href = "#page=sc"
					}
				}, {
					title: "邀请用户领金币",
					c: function() {
						dialog(`\n           你的专属链接<code>\n           ${"https://40code.com/#out=any&i="+v.detail.id}\n           </code><br>\n           别人(必须是新用户)通过你的专属链接进行账号注册<br>\n           你和他都可获得100金币\n           `)
					}
				}, {
					title: "刷新",
					c: function() {
						v.qh2()
					}
				}, {
					title: "退出登录",
					c: function() {
						document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.40code.com", console.log("清除cookie"), location.href = ""
					}
				}]
			},
			115: e => {
				e.exports = [e => {
					let t = new FormData;
					return console.log(e), e.size > 1e6 ? "图片必须小于1MB" : -1 == ["image/jpeg", "image/png", "image/gif", "image/bmp"].indexOf(e.type) ? "不支持此格式的图片" : (t.append("image", new Blob([e], {
							type: e.type
						})), void
						function(t) {
							v.waitRequest.cover = 1, $.ajax({
								url: apihost + "work/uploads?token=" + getCookie("token"),
								method: "POST",
								data: t,
								cache: !1,
								contentType: !1,
								processData: !1,
								dataType: "json",
								success: function(t) {
									let n = t.data[2][0][1].Key.split("/");
									v.detail.image = v.workview.image = n[n.length - 1], e = void 0, v.waitRequest.cover = -1
								},
								error: function() {
									alert("图片上传失败"), v.waitRequest.cover = -1, delete v.waitRequest.cover
								}
							})
						}(t))
				}]
			},
			557: e => {
				e.exports = {
					search: e => {
						setTimeout((() => {
							-1 == v.search.s2 && (v.search.s2 = 0), location.href = "#page=search&name=" + ($("#sname")
								.val() || "") + "&author=" + ($("#sauthor")
								.val() || getQueryString("author") || "") + "&type=" + v.search.type + "&p=" + v.search.page + "&s=" + v.search.s2 + "&sid=" + (e ? "" : getQueryString("sid") || "") + "&fl=" + (e ? "" : getQueryString("fl") || "") + "&fan=" + (e ? "" : getQueryString("fan") || "") + "&follow=" + (e ? "" : getQueryString("follow") || "") + "&folder=" + (e ? "" : getQueryString("folder") || "") + (getQueryString("title") && -1 != v.search.title2 ? "&title=" + getQueryString("title") : "")
						}), 1)
					},
					work: {},
					studio: [],
					user: [],
					page: 1,
					num: 0,
					time: 0,
					sid: 0,
					s: [
						["最早创建", "最早发布", "最近更新", "最近发布", "最多点赞", "最多浏览", "最多收藏"],
						["最多金币", "最新注册", "最早注册"],
						["最多成员", "最多作品", "最早创建", "最新创建"]
					],
					isfirst: 1,
					select: ["最新发布", "最多金币", "最多成员"]
				}
			},
			545: (e,t) => {
				e.exports = {
					email: [e => /^1[3456789]\d{9}$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e) || "请输入正确的邮箱或手机号"],
					code: [e => /^\d{6}$/.test(e) || "请输入6位数字验证码"],
					sendcode: () => {
						!0 === v.sign.email[0]($("#email")
							.val()) ? ( gt2.reset() && setTimeout(()=>gt2.showCaptcha(),200)) : alert("请输入正确的邮箱或手机号")
					},
					state: 0,
					s: e => {
						v.sign.state = e
					},
					l: function(e,t) {
						v.sign.token ? post({
							url: "user/" + ["login", "signup2", "signup2"][e],
							data: {
								email: $("#email")
									.val(),
								pw: $("#pw")
									.val(),
								t2: t || v.sign.token,
								i: getCookie("i"),
								nickname: $("#snickname")
									.val(),
								code: $("#vode") && $("#vode")
									.val && $("#vode")
									.val(),
								type: 2 == e ? 1 : 0
							},
							p: "sign"
						}, (function(t) {
							gt.reset(); 1 == t.code ? 0 == e ? (location.href = getQueryString("url") ? atob(getQueryString("url")) : "#", alert(t.msg), setCookie("token", t.token, 30), getuserinfo()) : (alert(t.msg), v.sign.state = 0) : alert(t.msg, 8e3)
						})) :  alert("请先完成图形验证码")//gt2.reset() && (gt2.a=1) && setTimeout(()=>gt2.showCaptcha(),200)
					},
					data: {
						email: "",
						pw: ""
					},
					go: () => {
						location.href = "#page=sign&url=" + btoa(location.href)
					}
				}
			},
			771: e => {
				e.exports = {
					new: function() {
						confirm("你确定要创建工作室吗？") && get({
							url: "studio/new",
							p: "newstudio"
						}, (function(e) {
							-1 != e.code ? location.href = "/#page=studio&id=" + e.id : alert(e.msg)
						}))
					},
					remove: e => {
						confirm("你确定要删除TA吗") && post({
							url: "studio/delete",
							p: "deleteuser",
							data: {
								uid: e,
								id: v.studio.info.id
							}
						}, (function(e) {
							-1 != e.code ? v.qh2() : alert(e.msg)
						}))
					},
					setadmin: (e, t) => {
						post({
							url: "studio/setadmin",
							p: "setadmin",
							data: {
								uid: e,
								id: v.studio.info.id,
								p: t
							}
						}, (function(e) {
							-1 != e.code ? v.qh2() : alert(e.msg)
						}))
					},
					my: [],
					info: null,
					ilist: [],
					getwork: () => {
						get({
							url: "studio/work",
							data: {
								id: v.studio.info.id
							}
						}, (e => {
							v.studio.worklist = e.data, v.studio.userlist2 = e.userlist
						}))
					},
					getuser: () => {
						get({
							url: "studio/user",
							data: {
								id: v.studio.info.id
							}
						}, (e => {
							v.studio.userlist = e.data, v.studio.p = e.p
						}))
					},
					worklist: [],
					p: void 0,
					update: function() {
						let e = {};
						e.name = $("[t='s-name']")
							.val(), e.introduce = $("[t='s-introduce']")
							.val(), e.color = $("[t='s-color']")
							.val(), e.chose = v.studio.chose, e.head = v.detail.image, e.id = v.studio.info.id, e.haspw = v.studio.info.haspw, e.pw = $("[t='s-pw']")
							.val(), console.log(e), post({
								url: "studio/info/update",
								data: e,
								p: "updatestudio"
							}, (function(e) {
								console.log(e)
							}))
					},
					quit: () => {
						confirm("你确定要退出吗") && post({
							url: "studio/quit",
							data: {
								id: v.studio.info.id
							}
						}, (function(e) {
							v.qh2()
						}))
					},
					join: () => {
						2 == v.studio.info.chose && alert("此工作室禁止任何人加入"), post({
							url: "studio/join",
							data: {
								pw: v.studio.info.haspw && prompt("请输入工作室加入密码"),
								id: v.studio.info.id
							}
						}, (() => v.qh2()))
					},
					main: () => {
						post({
							url: "studio/setmain",
							data: {
								id: v.studio.info.id
							}
						})
					},
					upload: () => {
						let e, t = prompt("请输入作品的链接或id");
						if (isNaN(parseInt(t, 10))) {
							if (t.indexOf("#") < 0) return void alert("请输入正确的链接");
							let n = new RegExp("(^|&)id=([^&]*)(&|$)", "i");
							if (e = t.split("#")[1].match(n)[2], !e) return void alert("请输入正确的链接")
						} else e = t;
						post({
							url: "studio/upload",
							data: {
								id: v.studio.info.id,
								work: e
							}
						})
					},
					chose: "0"
				}
			},
			490: e => {
				e.exports = {
					postmessage: () => {
						v.user.pm.show = 1
					},
					folderlist: [],
					getfolder: () => {
						get({
							url: "collections/folders",
							data: {
								id: v.workview.id
							}
						}, (e => {
							v.user.folderlist = e.folders
						}))
					},
					pm: {
						show: 0,
						send: () => {
							post({
								url: "user/private",
								data: {
									id: v.user.pm.id,
									text: v.user.pm.text
								},
								p: "pm"
							}, (() => {
								v.user.pm.show = 0
							}))
						},
						id: "",
						text: ""
					},
					getwork: e => {
						get({
							url: "work/user",
							data: {
								id: v.workview.id,
								l: e
							}
						}, (e => {
							v.worklist = e.data, v.userlist = e.userlist, console.log("获取评论", e)
						}))
					},
					getmessage: () => {
						get({
							url: "user/message",
							data: {
								l: 20,
								o: 20 * (v.user.msgpage - 1)
							}
						}, (e => {
							let t = e.data;
							for (let e in t) t[e].time = other.date(t[e].time);
							v.user.message = t, Vue.set(v.user, "msgtotal", e.num), console.log("获取消息", e), v.detail.msgnum = 0
						}))
					},
					follow: () => {
						post({
							url: "user/follow" + (v.workview.followu ? "/cancel" : ""),
							data: {
								id: v.workview.id
							}
						}, (e => {
							alert(e.msg), v.workview.followu = !v.workview.followu
						}))
					},
					getlist: e => {
						get({
							url: "user/flist",
							data: {
								id: e,
								type: getQueryString("f") ? 1 : 0
							}
						}, (e => {
							v.user.flist = e.data
						}))
					},
					signin: () => {
						post({
							url: "user/signin",
							p: "signin"
						}, (e => {
							alert(e.msg, 1e4)
						}))
					},
					flist: [],
					list: [],
					message: {},
					msgpage: 1,
					msgtotal: 0,
					flisttype: !!getQueryString("type") - 0,
					delmsg: e => {
						post({
							url: "/user/message/delete",
							data: {
								id: e
							}
						}, (() => {
							v.user.getmessage()
						}))
					},
					edit: 0
				}
			},
			378: e => {
				e.exports = {
					checkbox: [],
					new: function() {
						post({
							url: "work/new",
							p: "newwork"
						}, (function(e) {
							location.href = "/editor.html#id=" + e.info.insertId
						}))
					},
					pub: () => {
						post({
							url: "work/pub",
							data: {
								id: v.workview.id
							},
							p: "pubwork"
						}, (function(e) {
							console.log(e), v.qh2()
						}))
					},
					update: function() {
						$("[name='editinfo']");
						let e = {};
						e.name = $("[t='name']")
							.val(), e.introduce = $("[t='introduce']")
							.val(), e.opensource = $("[t='opensource']")[0].checked, e.publish = $("[t='publish']")[0].checked, e.image = v.workview.image, e.id = v.$data.workview.id, console.log(e), post({
								url: "work/info/update",
								data: e,
								p: "updatework"
							}, (function(e) {
								console.log(e), location.href = "#page=work&id=" + v.$data.workview.id
							}))
					},
					return: function() {
						location.href = "#page=work&id=" + v.$data.workview.id
					},
					all: function(e) {
						e && (location.href = "#page=allwork" + e), setTimeout((() => {
							get({
								url: "work/all",
								data: {
									tags: getQueryString("tags"),
									user: getQueryString("user"),
									name: getQueryString("name")
								}
							}, (function(e) {
								v.$data.rows = [{
									title: "作品",
									worklist: e.data.worklist,
									userlist: e.data.userlist
								}]
							}))
						}))
					},
					search: function() {
						location.href = "#page=allwork&name=" + $("#sname")
							.val() + "&user=" + $("#sauthor")
							.val()
					},
					like: () => {
						post({
							url: "work/like" + (v.workview.islike ? "/cancel" : ""),
							data: {
								id: v.workview.id
							}
						}, (e => {
							alert(e.msg), v.workview.islike ? v.workview.like-- : v.workview.like++, v.workview.islike = !v.workview.islike
						}))
					},
					del: e => {
						confirm("你确定要删除此作品吗") && post({
							url: "work/delete",
							data: {
								id: e
							}
						}, (e => {
							alert(e.msg), v.qh2()
						}))
					},
					share: () => {
						get({
							url: "work/link",
							data: {
								id: getQueryString("id")
							}
						}, (function(e) {
							e.data.indexOf("etime") ? dialog(e.data + "<br>链接有效期7天，获取到此链接的人可查看此作品") : dialog(e.data + "<br>分享此作品给未注册40code的人，通过此链接注册，你可获得100金币")
						}))
					},
					collection: () => {
						dialog("<iframe src='/sc.html' style='width:100%;height:300px;border:0px'  />")
					},
					removeCollection: () => {
						post({
							url: "/collections/cancel",
							data: {
								work_id: v.workview.id
							}
						}, (() => {
							alert("取消收藏成功"), top.v.workview.is_collection = 0, v.workview.num_collections--
						}), (e => {
							alert(e.responseJSON.error)
						}))
					},
					analysis: () => {
						alert("请稍等");
						var e = (top.vm || top[0].vm || top[1].vm || top[2].vm)
							.runtime.targets.map((e => e.sprite.blocks._blocks));
						if (!e.length) return void alert("请等待作品加载完毕再进行分析");
						var t = ["control_start_as_clone", "procedures_definition", "procedures_prototype", "event_whenflagclicked", "event_whenkeypressed", "event_whenstageclicked", "event_whenthisspriteclicked", "event_whenbackdropswitchesto", "event_whengreaterthan", "event_whenbroadcastreceived", "makeymakey_whenMakeyKeyPressed", "makeymakey_whenCodePressed"],
							n = ["control_repeat", "math_whole_number", "control_forever", "control_if", "control_if_else", "control_repeat_until", "control_while", "control_for_each", "math_whole_number"],
							o = {},
							i = 0,
							a = 0,
							s = 0;
						for (let p = 0; p < e.length; p++) {
							let u = [],
								g = e[p],
								f = Object.keys(g);
							for (let w = 0; w < f.length; w++)
								if (!g[f[w]].shadow) {
									try {
										function r(e, t = 0) {
											return u.push(e.id), e.next ? r(g[e.next], t + 1) : t
										}
										if (g[f[w]].topLevel && (a++, -1 !== t.indexOf(g[f[w]].opcode))) {
											let h = r(g[f[w]]);
											h && (s++, i += h + 1)
										}
										if (-1 !== n.indexOf(g[g[f[w]].parent].opcode)) {
											let _ = r(g[f[w]]);
											i++, _ && (i += _)
										}
									} catch (k) {
										console.log(k)
									}
									try {
										let y = g[f[w]].opcode.split("_")[0];
										void 0 === o[y] ? o[y] = 1 : o[y]++
									} catch (x) {
										console.log(x)
									}
								} console.log(u);
							for (let b = 0; b < f.length; b++)
								if (!g[f[b]].shadow) try {
									function l(e) {
										return -1 !== u.indexOf(e.id) ? 1 : e.parent ? l(g[e.parent]) : 0
									}
									g[f[b]].parent && -1 === u.indexOf(g[f[b]].id) && l(g[g[f[b]].parent]) && i++
								} catch (S) {
									console.log(S)
								}
						}
						console.log(o, i);
						var c = e.length - 1,
							d = top[0].vm.assets.length;
						let m = {
							context: o,
							info: v.workview.name + "-" + v.workview.nickname,
							segs: a,
							vsegs: s,
							valid: i,
							jn: c,
							an: d
						};
						console.log(m), dialog('<iframe src="/other/analysis.html#' + encodeURI(JSON.stringify(m)) + '" style="width:100%;border-width: 0px;height:700px"></iframe>', 750)
					}
				}
			},
			104: e => {
				e.exports = function(e) {
					getuserinfo(), v.stitle("账号设置")
				}
			},
			174: e => {
				e.exports = e => {
					getQueryString("f") ? v.stitle("关注列表") : v.stitle("粉丝列表"), v.user.getlist(e)
				}
			},
			828: e => {
				e.exports = function() {
					v.stitle("40code少儿编程社区"), get({
						url: "work/index"
					}, (function(e) {
						v.$data.rows = e.data
					})), get({
						url: "user/clist"
					}, (function(e) {
						v.user.list = e.data
					})), get({
						url: "studio/index"
					}, (function(e) {
						v.studio.ilist = e.data
					}))
				}
			},
			251: e => {
				e.exports = e => {
					v.stitle("消息"), v.user.getmessage()
				}
			},
			209: e => {
				e.exports = function() {
					v.stitle("我的工作室"), get({
						url: "studio/my"
					}, (function(e) {
						Vue.set(v.studio, "my", e.data)
					}))
				}
			},
			715: e => {
				e.exports = function() {
					v.stitle("我的作品"), get({
						url: "work/my"
					}, (function(e) {
						v.$data.mywork = e.data
					})), location.href = "#page=mywork"
				}
			},
			116: e => {
				e.exports = e => {
					Vue.set(v.search, "type", getQueryString("type")), v.search.page = +getQueryString("p") || 1, v.search.type = +getQueryString("type") + 1 ? +getQueryString("type") : 0, Vue.set(v.search, "work", {}), Vue.set(v.search, "studio", {}), Vue.set(v.search, "user", {}), Vue.set(v.search, "s2", getQueryString("s")), Vue.set(v.search, "name", getQueryString("name")), Vue.set(v.search, "author", getQueryString("author")), v.search.title = getQueryString("title"), post({
						url: "/search/",
						data: {
							name: getQueryString("name"),
							author: getQueryString("author"),
							type: getQueryString("type"),
							s: getQueryString("s") || 0,
							sid: getQueryString("sid") || 0,
							fl: getQueryString("fl") || 0,
							fan: getQueryString("fan") || 0,
							follow: getQueryString("follow") || 0,
							page: v.search.page,
							folder: getQueryString("folder") || 0
						}
					}, (function(e) {
						Vue.set(v.search, ["work", "user", "studio"][+getQueryString("type")], e.data), Vue.set(v.search, "num", e.data.num), Vue.set(v.search, "time", e.data.time), Math.ceil(v.search.num / 12) < v.search.page && 0 != v.search.num && (v.search.page = Math.ceil(v.search.num / 12))
					}))
				}
			},
			253: e => {
				e.exports = () => {
					v.stitle("登录注册"), setTimeout((() => {
						// myCaptcha = _dx.Captcha(document.getElementById("c1"), {
						// 	appId: "39248c3724c1b6b8f2b77645fde5b19e",
						// 	apiServer: "https://vip56.dingxiang-inc.com",
						// 	success: function(e) {
						// 		v.sign.token = e
						// 	}
						// }), window.myCaptcha2 = _dx.Captcha(document.getElementById("c2"), {
						// 	appId: "39248c3724c1b6b8f2b77645fde5b19e",
						// 	apiServer: "https://vip56.dingxiang-inc.com",
						// 	style: "popup",
						// 	success: function(e) {
						// 		console.log("验证成功"), post({
						// 				url: "user/sendcode",
						// 				data: {
						// 					email: $("#email")
						// 						.val(),
						// 					token: e
						// 				},
						// 				p: "sendcode"
						// 			}, (function(e) {
						// 				alert(e.msg, 8e3)
						// 			})), $($("#dx_captcha_basic_tr-btn-close_2")[0].children[0])
						// 			.click(), myCaptcha2.reload()
						// 	}
                        // })
                        var captchaId = "c0723d25371bf71359761aa06f6075ed"   // gt_id
                        var product = "float"
                            if (product !== 'bind') {
                            $('#btn').remove();
                        }
                    
                        initGeetest4({
                            captchaId: captchaId,
                            product: product,
                        }, function (gt) {
                            window.myCaptcha=window.gt = gt
                            gt
                                .appendTo("#c1")
                                .onSuccess(function (e) {
                                    var result = gt.getValidate();
                                    v.sign.token = result
                                })
                    
                            $('#c1 > #btn').click(function () {
                                gt.showBox();
                            })
                            $('#c1 > #reset_btn').click(function () {
                                gt.reset();
                            })
                        });
                        initGeetest4({
                            captchaId: captchaId,
                            product: 'bind',
                        }, function (gt2) {
                            window.myCaptcha2=window.gt2 = gt2
                            gt
                                .appendTo("#c2")
                                .onSuccess(function (e) {
                                    var result = gt2.getValidate();
                                    // if(!gt2.a){
                                        post({
                                            url: "user/sendcode",
                                            data: {
                                                email: $("#email")
                                                    .val(),
                                                t2: result
                                            },
                                            p: "sendcode"
                                        }, (function(e) {
                                            alert(e.msg, 8e3)
                                        }))
                                    // }else{
                                    //     v.sign.l()
                                    // }
                                    // gt2.a=0;
                                })
                    
                            $('#c2 > #btn').click(function () {
                                gt2.showBox();
                            })
                            $('#c2 > #reset_btn').click(function () {
                                gt2.reset();
                            })
                        });
					}), 200)
				}
			},
			758: e => {
				e.exports = function(e) {
					v.stitle("工作室"), Vue.set(v.studio, "info", null), Vue.set(v.studio, "userlist", null), get({
						url: "studio/info",
						data: {
							id: e
						}
					}, (function(e) {
						e.data && (Vue.set(v.studio, "info", e.data), v.studio.info.introduce2 = v.studio.info.introduce ? markdownToHtml(v.studio.info.introduce) : "当前工作室暂时没有介绍哦", v.comment.getcomment(), v.studio.getwork(), v.studio.getuser(), v.detail ? v.item.getwork() : setTimeout((() => {
							v.detail && v.item.getwork()
						}), 2e3), setTimeout((() => {
							$("textarea")
								.bind("paste", v.paste)
						}), 100))
					}))
				}
			},
			811: e => {
				e.exports = function(e) {
					v.stitle("工作室设置"), Vue.set(v.studio, "info", null), get({
						url: "studio/info",
						data: {
							id: e
						}
					}, (function(e) {
						e.data && (Vue.set(v.studio, "info", e.data), v.studio.chose = v.studio.info.chose.toString(), console.log(v.studio.chose, v.studio.info.chose.toString()))
					}))
				}
			},
			534: e => {
				e.exports = function(e) {
					v.stitle("用户"), v.user.edit = 0, v.$data.workview = {
						image: "6e2b0b1056aaa08419fb69a3d7aa5727.png"
					}, get({
						url: "user/info",
						data: {
							id: e
						}
					}, (function(e) {
						console.log(e), e.data && (v.stitle(e.data[0] && e.data[0].nickname), v.$data.workview = e.data[0], v.workview.introduce2 = v.workview.introduce ? markdownToHtml(v.workview.introduce) : "当前用户暂时没有介绍哦", v.comment.getcomment(), v.user.getwork(6), v.user.getfolder(), v.detail ? v.item.getwork() : setTimeout((() => {
							v.detail && v.item.getwork()
						}), 2e3), setTimeout((() => {
							$("textarea")
								.unbind("paste")
								.bind("paste", v.paste)
						}), 100))
					}))
				}
			},
			960: e => {
				e.exports = function(e) {
					v.stitle("scratch作品"), v.$data.workview = {
						id: 0
					}, get({
						url: "work/info",
						data: {
							id: e,
							sha: getQueryString("sha"),
							etime: getQueryString("etime")
						}
					}, (function(e) {
						let t = e.data;
						t ? (t.introduce2 = markdownToHtml(t.introduce), v.workview = t, v.comment.getcomment(), v.detail ? v.item.getwork() : setTimeout((() => {
							v.detail && v.item.getwork()
						}), 2e3), v.title = t.name + " by " + t.nickname, v.stitle(t.name + " by " + t.nickname), setTimeout((() => {
							$("textarea")
								.unbind("paste")
								.bind("paste", v.paste)
						}), 100)) : alert("服务器或网络错误")
					}))
				}
			},
			516: e => {
				e.exports = function(e) {
					v.$data.workview = {
						image: "6e2b0b1056aaa08419fb69a3d7aa5727.png"
					}, delete waitRequest.cover, v.stitle("作品信息设置"), get({
						url: "work/info",
						data: {
							id: e
						}
					}, (function(e) {
						if (!e.data) return;
						let t = e.data;
						getQueryString("publish") && (t.publish = 1), v.workview = t, v.opensource = t.opensource, v.publish = t.publish
					}))
				}
			},
			319: e => {
				e.exports = {
					props: ["info", "host", "item", "c"],
					template: ' <v-tooltip bottom color="success">\n    <template v-slot:activator="{ on, attrs }">\n    <v-card\n      class="mx-auto pa-2 sd"\n      rounder\n      v-on:click="c(info.itemId)"\n      v-bind="attrs"\n      v-on="on"\n    >\n\n         <v-img :src="host.data+\'/static/internalapi/asset/\'+(info.item.thumbId || \'6e2b0b1056aaa08419fb69a3d7aa5727.png\')" style="width:100%"\n  max-height="200" class="mx-auto"\n  v-on:click="c(info.itemId)"\n  max-width="200"></v-img>\n      <span style="position: absolute;color: #222;background-color: #fff;border-radius: 0 0 10px;-webkit-box-shadow: 0 2px 10px #e8e8e8;box-shadow: 0 2px 10px #e8e8e8;text-align: center;left: 0;top: 0;width: 24px;height: 24px;line-height: 24px;">{{info.count}}</span>\n    </v-card>\n    </template>\n    <span style="max-width:130px">{{info.item.name}}<br>{{info.item.descp}}</span>\n  </v-tooltip>'
				}
			},
			831: e => {
				e.exports = {
					props: ["comment", "host", "detail", "type", "author", "date"],
					template: '<div v-if="comment.comment" class="my-5 comment-view">\n    <div v-for="(i, index) in comment.comment.comment" class="my-6">\n        <div v-for="j in comment.comment.user[i.fromuser.toString()]" class="mt-2">\n            <div>\n                <v-row no-gutters>\n                    <span style="flex: 0 0 5px;"></span>\n                    <span style="flex: 0 0 10px;" class="mt-1">\n                        <a :href="\'#page=user&id=\'+i.fromuser">\n                            <v-avatar size=40 class="">\n                                <img\n                                    :src="host.data+\'/static/internalapi/asset/\'+(j.head || \'6e2b0b1056aaa08419fb69a3d7aa5727.png\')">\n                            </v-avatar>\n                        </a>\n                    </span>\n                    <span style="flex: 0 0 10px;"></span>\n                    <span style="flex: 0 0 calc( 100% - 60px)">\n                        <v-row no-gutters>\n                            <v-col cols="12">\n                                <a :href="\'#page=user&id=\'+i.fromuser">\n                                    {{ j.nickname }} <span style="color:#888;font-size: 7px;">{{ i.time }}<span class="ml-2" v-if="i.ip_format">[{{ i.ip_format }}]</span></span>\n                                </a>\n                                <a :href="`#page=studio&id=${comment.comment.studio[j.studio].id}`"\n                                    v-if="comment.comment.studio[j.studio]">\n                                    <v-btn style="text-transform: none!important;"\n                                        :color="comment.comment.studio[j.studio].color || \'green\'" class="sd tg" small>\n                                        <span style="color:white">{{ comment.comment.studio[j.studio].name }}</span>\n                                    </v-btn>\n                                </a>\n                            </v-col>\n                            <v-col cols="12" >\n                                <span color="accent" class="pm" v-html="i.comment"></span>\n                                <v-btn class="text--secondary float-left" text small\n                                    v-on:click="comment.showreply(i.id,)" style="margin-top: -15px;">\n                                    <v-icon>mdi-reply</v-icon> 回复\n                                </v-btn>\n                                <v-btn class="text--secondary float-right" text small style="margin-top: -15px;"\n                                    v-if="detail && (detail.id==i.touser || detail.id==i.fromuser || detail.is_admin)"\n                                    v-on:click="comment.delete(i.id,detail.id==i.touser || detail.id==i.fromuser)">\n                                    <v-icon>mdi-delete</v-icon> 删除\n                                </v-btn>\n                                <br>\n                                <span v-if="detail && comment.replyid==i.id">\n                                    <br>\n                                    <s-c2 :comment="comment" :host="host" :detail="detail" :reply="i.id" class="mt">\n                                    </s-c2>\n                                </span>\n\n\n                            </v-col>\n                        </v-row>\n                    </span>\n\n                </v-row>\n            </div>\n            <div v-if="i.replynum">\n                <div v-for="(k,num) in comment.comment.reply[i.id.toString()]">\n                    <div v-for="j in comment.comment.user[k.fromuser.toString()]" class="mt-2" v-if="num<2 || i.show">\n\n                        <v-row no-gutters>\n                            <span style="flex: 0 0 50px;"></span>\n                            <span style="flex: 0 0 10px;" class="mt-1">\n                                <a :href="\'#page=user&id=\'+j.id">\n                                    <v-avatar size=40 class="">\n                                        <img\n                                            :src="host.data+\'/static/internalapi/asset/\'+(j.head || \'6e2b0b1056aaa08419fb69a3d7aa5727.png\')">\n                                    </v-avatar>\n                                </a>\n                            </span>\n                            <span style="flex: 0 0 15px;"></span>\n                            <span style="flex:0 0 calc( 100% - 110px )">\n                                <v-row no-gutters>\n                                    <v-col cols="12">\n                                        <a :href="\'#page=user&id=\'+k.fromuser">\n                                            {{ j.nickname }} <span\n                                                style="color:#888;font-size: 7px;">{{ k.time }} <span class="ml-2" v-if="k.ip_format">[{{ k.ip_format }}]</span> </span>\n                                        </a>\n                                        <a :href="`#page=studio&id=${comment.comment.studio[j.studio].id}`"\n                                            v-if="comment.comment.studio[j.studio]">\n                                            <v-btn style="text-transform: none!important;"\n                                                :color="comment.comment.studio[j.studio].color || \'green\'" class="sd tg"\n                                                small>\n                                                <span\n                                                    style="color:white">{{ comment.comment.studio[j.studio].name }}</span>\n                                            </v-btn>\n                                        </a>\n                                    </v-col>\n                                    <v-col cols="12">\n                                        <span color="accent" class="pm" v-html="k.comment"></span>\n                                        <v-btn class="text--secondary float-left" text small\n                                            v-on:click="comment.showreply(i.id,k.id)" style="margin-top: -15px;">\n                                            <v-icon>mdi-reply</v-icon> 回复\n                                        </v-btn>\n                                        <v-btn class="text--secondary float-right" text small\n                                            v-if="detail && (detail.id==k.fromuser || detail.is_admin)" style="margin-top: -15px;"\n                                            v-on:click="comment.deletereply(k.id,detail.id==k.fromuser)">\n                                            <v-icon>mdi-delete</v-icon> 删除\n                                        </v-btn>\n                                    </v-col>\n                                </v-row>\n                            </span>\n\n\n                        </v-row>\n                    </div>\n                </div>\n                <div class="text-center">\n                    <v-btn class="text--secondary px-auto" v-if="i.replynum>2 && !i.show" text small v-on:click="comment.showmore(index)" style="">\n                        显示更多\n                    </v-btn>\n                </div>\n            </div>\n        </div>\n        <div v-if="index%4==0 && comment.comment.ad && comment.comment.ad[index/4]" class="mt-2">\n            <v-row no-gutters>\n                <span style="flex: 0 0 5px;"></span>\n                <span style="flex: 0 0 10px;" class="mt-3">\n                    <a :href="\'#page=user&id=\'+comment.comment.ad[index/4].author">\n                        <v-avatar size=40 class="">\n                            <img\n                                :src="host.data+\'/static/internalapi/asset/\'+(comment.comment.admap[comment.comment.ad[index/4%4].author].head || \'6e2b0b1056aaa08419fb69a3d7aa5727.png\')">\n                        </v-avatar>\n                    </a>\n                </span>\n                <span style="flex: 0 0 10px;"></span>\n                <span style="flex: 0 0 calc( 100% -60px ) ;">\n                    <v-row no-gutters>\n                        <v-col cols="12">\n                        <a :href="\'#page=work&id=\'+comment.comment.ad[index/4%4].id">\n                        {{comment.comment.ad[index/4%4].name}}\n                        </a>\n                            <span style="color:#999">(作品推荐卡)</span>\n                            <span class="ml-2"\n                                style="color:#777">{{ date(comment.comment.ad[index/4%4].update_time) }}</span>\n                        </v-col>\n                        <span style="flex: 0 0 200px;">\n                            <a :href="\'#page=work&id=\'+comment.comment.ad[index/4%4].id">\n                                <img style="max-width:200px"\n                                    :src="host.data+\'/static/internalapi/asset/\'+(comment.comment.ad[index/4%4].image || \'6e2b0b1056aaa08419fb69a3d7aa5727.png\')" />\n                            </a>\n                        </span>\n                        <span style="flex: 0 0 10px;"></span>\n                        <span style="flex: 0 0 200px;">\n                            <span style="color:#999">\n                                <v-icon size="16">mdi-eye</v-icon> {{ comment.comment.ad[index/4%4].look }}\n                            </span>\n                            <span style="color:#999" class="ml-1">\n                                <v-icon size="16">mdi-heart</v-icon> {{ comment.comment.ad[index/4%4].like }}\n                            </span><br>\n                            <span style="color:#999">作者：</span><a :href="\'#page=user&id=\'+comment.comment.ad[index/4%4].author">\n                            {{comment.comment.admap[comment.comment.ad[index/4%4].author].nickname}}\n                            </a>\n                        </span>\n                    </v-row>\n        </div>\n    </div>\n    <div class="text-center my-3" v-if="comment.comment.num>0">\n        <v-pagination v-model="comment.page" :length="Math.ceil(comment.comment.num/6)" :total-visible="7">\n        </v-pagination>\n    </div>\n</div>\n<div v-else>\n    此用户暂时没有评论哦\n</div>'
				}
			},
			370: e => {
				e.exports = {
					props: ["comment", "reply"],
					template: '<span>\n    <v-textarea clearable v-model="comment.text[reply?\'c-\'+reply:\'comment\']"\n    clear-icon="mdi-close-circle" :id="reply?\'c-\'+reply:\'comment\'" filled label="评论" auto-grow :value="comment.text[reply?\'c-\'+reply:\'comment\']" maxlength="500" counter>\n    </v-textarea>\n    <v-btn class="pa-2 mx-auto sd" v-on:click="comment.send(reply)"  color="accent"  block>发送</v-btn>\n</span>\n'
				}
			},
			467: e => {
				e.exports = {
					props: ["folder", "host", "user"],
					template: '\n    <v-card class="mb-3 sd">\n    <v-card :href="\'#page=search&name=&author=&type=0&p=1&s=4&sid=&fl=&fan=&follow=&folder=\'+folder.id+\'&title=\'+user+\'的收藏夹 - \'+folder.name" elevation="0">\n        <v-img :src="host.data+\'/static/internalapi/asset/\'+folder.cover" :aspect-ratio="4/3">\n        </v-img>\n        <v-row class="pt-5 pl-5 pb-2" style="max-width:100%">\n            <div class="row">\n                <div class="col-12 text-truncate" style="font-size:15px;color:#444">\n                    {{ folder.name }}\n                </div>\n            </div>\n            <span class="text-truncate" ></span>\n            <span style="color:#888">{{ folder.is_public?\'公开\':\'私密\' }}</span>\n        </v-row>\n    </v-card>\n</v-card>\n    '
				}
			},
			421: e => {
				e.exports = {
					props: ["info"],
					template: "<template>\n    \n    </template>"
				}
			},
			539: e => {
				e.exports = {
					props: ["info", "host", "c"],
					template: '\n    <v-card outlined @click="c(info.id)">\n    <v-list-item three-line>\n      <v-list-item-content>\n        <v-list-item-title class="text-h5 mb-1">\n          {{info.name}}\n        </v-list-item-title>\n        <v-list-item-subtitle>{{info.descp}}</v-list-item-subtitle>\n      </v-list-item-content>\n\n      <v-list-item-avatar\n        tile\n        size="80"\n      ><v-img :src="host.data+\'/static/internalapi/asset/\'+(info.thumbId || \'6e2b0b1056aaa08419fb69a3d7aa5727.png\')" /></v-list-item-avatar>\n    </v-list-item>\n\n    <v-card-actions>\n      <v-btn\n        outlined\n        rounded\n        text\n      >\n        购买\n      </v-btn>\n      <v-spacer></v-spacer>{{info.price}}金币\n    </v-card-actions>\n    \n    \n  </v-card>\n    '
				}
			},
			359: e => {
				e.exports = {
					props: ["studio", "host"],
					template: '\n    <v-card :href="\'#page=studio&id=\'+studio.id" class="rounded-lg py-2 sd">\n\n    <v-row class="py-5 px-8">\n        <span style="flex: 0 0 55px;max-width:55px">\n            <v-avatar size="40">\n                <img\n                    :src="host.data+\'/static/internalapi/asset/\'+(studio.head || \'6e2b0b1056aaa08419fb69a3d7aa5727.png\')" />\n            </v-avatar>\n        </span>\n        <span style="flex: 0 0 calc( 100% - 55px );max-width:calc( 100% - 55px )">\n            <span color="accent" class="\n            text-h5 text--secondary text-truncate text-caption\n            pr-3\n            ">\n                <div class="row">\n                    <div class="col-12 text-truncate" style="font-size:13px;">\n                        {{ studio.name }}\n                    </div>\n                </div>\n\n                <span class="text--disabled">作品:</span>\n                <a style="color:#555">{{ studio.worknum }}</a>\n                <span class="text--disabled">成员:</span>\n                <a style="color:#555">{{ studio.membernum }}</a>\n            </span>\n\n        </span>\n    </v-row>\n</v-card>\n  \n'
				}
			},
			975: e => {
				e.exports = {
					props: ["user", "host", "position", "o"],
					template: '\n    <v-card :href="position?null:\'#page=user&id=\'+user.id" class="py-2 sd" :color="user.position==\'3\'?\'red\':user.position==\'1\'?\'green\':user.position==\'2\'?\'orange\':\'white\'">\n    <span style="position: absolute;top: 0;right: 0px;color: white;">\n      <template v-if="!position">\n        <v-btn\n          text\n          x-small\n          :color="user.position==\'0\'?\'#666\':\'white\'"\n        >\n          <span v-if="user.position==\'3\'">室长</span>\n          <span v-if="user.position==\'2\'">副室长</span>\n          <span v-if="user.position==\'1\'">管理员</span>\n        </v-btn>\n      </template>\n      <template v-if="position">\n        <div class="text-center">\n          <v-menu offset-y>\n            <template v-slot:activator="{ on, attrs }">\n              <v-btn\n                text\n                x-small\n                v-bind="attrs"\n                v-on="on"\n                :color="user.position==\'0\'?\'#666\':\'white\'"\n              >\n                <span v-if="user.position==\'3\'">室长</span>\n                <span v-if="user.position==\'2\'">副室长</span>\n                <span v-if="user.position==\'1\'">管理员</span>\n                ···\n              </v-btn>\n            </template>\n            <v-list>\n              <v-list-item v-on:click="o.remove(user.id)" v-if="position>user.position">\n                <v-list-item-title>移出工作室</v-list-item-title>\n              </v-list-item>\n              <span v-if="position>1">\n                <v-list-item v-on:click="o.setadmin(user.id,0)" v-if="user.position==\'1\'">\n                  <v-list-item-title >取消管理员</v-list-item-title>\n                </v-list-item>\n                <v-list-item v-on:click="o.setadmin(user.id,1)" v-else>\n                  <v-list-item-title>设为管理员</v-list-item-title>\n                </v-list-item>\n              </span>\n              <span v-if="position>2">\n                <v-list-item v-on:click="o.setadmin(user.id,0)" v-if="user.position==\'2\'">\n                  <v-list-item-title >取消副室长</v-list-item-title>\n                </v-list-item>\n                <v-list-item v-on:click="o.setadmin(user.id,2)" v-else>\n                  <v-list-item-title >设为副室长</v-list-item-title>\n                </v-list-item>\n              </span>\n            </v-list>\n          </v-menu>\n        </div>\n      </template>\n    </span>\n    <div :onclick="\'window.open(\\\'/#page=user&id=\'+user.id+\'\\\')\'">\n      <v-row :class="\'pt-5 px-8 \'+(0?\'\':\'pb-5\')" >\n        <span style="flex: 0 0 55px;max-width:55px">\n          <v-avatar size="40">\n            <img :src="host.data+\'/static/internalapi/asset/\'+(user.head || \'6e2b0b1056aaa08419fb69a3d7aa5727.png\')" />\n          </v-avatar>\n        </span>\n        <span style="flex: 0 0 calc( 100% - 55px );max-width:calc( 100% - 55px )">\n          <span color="accent" class="\n              text-h5 text--secondary text-truncate text-caption pr-3\n              ">\n            <div class="row">\n              <div class="col-12 text-truncate" :style="\'font-size:13px;\'+(!user.position?\'color:#666\':\'color:#fff\')">\n                {{ user.nickname }}\n              </div>\n            </div>\n            <span class="text-truncate" ></span>\n            <span :style="!user.position?\'color:#aaa\':\'color:#fff\'">金币:</span>\n            <a :style="!user.position?\'color:#aaa\':\'color:#fff\'">{{ user.coins }}</a>\n          </span>\n        </span>\n      </v-row>\n    </div>\n  </v-card>\n  \n'
				}
			},
			355: e => {
				e.exports = {
					props: ["work", "user", "host", "my"],
					template: '\n    <v-card class="mb-3 sd">\n    <v-card :href="\'#page=work&id=\'+work.id" elevation="0">\n        <v-img :src="host.data+\'/static/internalapi/asset/\'+work.image" :aspect-ratio="4/3"\n            class="white--text align-end" \n            gradient="to bottom, rgba(0,0,0,0) calc( 100% - 26px ) , rgba(0, 0, 0, 0.6)">\n            <span class="ma-2">\n                <span>\n                    <v-icon color="white" size="16">mdi-eye</v-icon>\n                    <span style="font-size: 13px;"> {{ work.look }}</span> \n                </span>\n                <span class="ml-1">\n                    <v-icon color="white" size="16">mdi-heart</v-icon> \n                    <span style="font-size: 13px;"> {{ work.like }}</span> \n                </span>\n                <span class="ml-1">\n                    <v-icon color="white" size="16">mdi-star</v-icon>\n                    <span style="font-size: 13px;"> {{ work.num_collections }}</span>  \n                </span>\n            </span>\n        </v-img>\n        <v-row class="pt-5 pl-5 pb-2" style="max-width:100%" v-if="user">\n            <span style="flex: 0 0 55px;max-width:55px">\n                <v-avatar size="45">\n                    <img :src="host.data+\'/static/internalapi/asset/\'+(user.head || \'6e2b0b1056aaa08419fb69a3d7aa5727.png\')" />\n                </v-avatar>\n            </span>\n            <span style="flex: 0 0 calc( 100% - 55px );max-width:calc( 100% - 55px )">\n                <span color="accent" class="\n                    text-h5 text-truncate text-caption pr-3\n                    ">\n                    <div class="row">\n                        <div class="col-12 text-truncate" style="font-size:15px;color:#444">\n                            {{ work.name }}\n                        </div>\n                    </div>\n                    <span class="text-truncate" ></span>\n                    <span :href="\'#page=user&id=\'+work.author" style="color:#888">{{ user.nickname }}</span>\n                </span>\n            </span>\n        </v-row>\n        <v-row v-else>\n            <div class="col-12 text-truncate ma-3" style="font-size:15px;color:#444">\n                {{ work.name }}\n            </div>\n        </v-row>\n    </v-card>\n    <span v-if="my">\n        <v-btn color="green" text v-if="work.publish" depressed block text tile>已发布\n        </v-btn>\n        <v-btn color="red" text v-else depressed block text tile>未发布\n        </v-btn>\n        <span>\n            <v-btn color="accent" class="" v-if="my" :href="\'/editor.html#id=\'+work.id" target="_blank"\n                depressed text block>继续创作\n            </v-btn>\n            <v-btn color="accent" class="" v-if="my" v-on:click="my.del(work.id)" target="_blank"\n                depressed text block>删除\n            </v-btn>\n        </span>\n        <br>\n    </span>\n</v-card>\n    '
				}
			}
		},
		__webpack_module_cache__ = {};

	function __webpack_require__(e) {
		var t = __webpack_module_cache__[e];
		if (void 0 !== t) return t.exports;
		var n = __webpack_module_cache__[e] = {
			exports: {}
		};
		return __webpack_modules__[e](n, n.exports, __webpack_require__), n.exports
	}
	var __webpack_exports__ = {};
	(() => {
		Vue.component("s-item", __webpack_require__(421)), Vue.component("s-comment", __webpack_require__(831)), Vue.component("s-c2", __webpack_require__(370)), Vue.component("s-workcard", __webpack_require__(355)), Vue.component("s-usercard", __webpack_require__(975)), Vue.component("s-studiocard", __webpack_require__(359)), Vue.component("s-store-item", __webpack_require__(539)), Vue.component("s-bag-item", __webpack_require__(319)), Vue.component("s-foldercard", __webpack_require__(467)), window.alert = (e, t) => {
			v.sb.text = e, v.sb.timeout = t || 3e3, v.sb.show = 1
		}, window.dialog = (e, t) => (v.sb2.text = e, v.sb2.width = t, setTimeout((() => {
			v.sb2.show = 1
		}), 5), {
			close: () => {
				v.sb2.show = 0
			}
		}), marked.setOptions({
			highlight: function(e) {
				if (-1 !== e.indexOf("scratch")) return e;
				try {
					return hljs.highlightAuto(e)
						.value
				} catch (t) {
					return console.log(t), e
				}
			}
		}), window.markdownToHtml = e => DOMPurify.sanitize(marked.parse(e)), window.pagecz = {
			index: __webpack_require__(828),
			search: __webpack_require__(116),
			sign: __webpack_require__(253),
			mywork: __webpack_require__(715),
			mystudio: __webpack_require__(209),
			work: __webpack_require__(960),
			workinfo: __webpack_require__(516),
			user: __webpack_require__(534),
			account: __webpack_require__(104),
			message: __webpack_require__(251),
			flist: __webpack_require__(174),
			studio: __webpack_require__(758),
			studio_edit: __webpack_require__(811),
			forum: () => {
				v.forum.getlist()
			},
			post: () => {
				v.forum.post.get()
			},
			myitem: () => {
				v.item.get(), getuserinfo()
			}
		};
		let e = {
				rules: __webpack_require__(115),
				item: __webpack_require__(882),
				host: {
					data: "https://40code-cdn.zq990.com",
					scratch: "https://newsccode-1302921490.cos-website.ap-shanghai.myqcloud.com"
				},
				work: __webpack_require__(378),
				lb: [{
					href: "http://f.40code.com",
					src: "https://s1.ax1x.com/2023/02/19/pSLoIqP.png"
				}],
				items: __webpack_require__(105),
				pw: e => !/^[0-9]*$/.test(e) || e.length > 9 ? e.length < 6 ? "密码必须大于6位" : void 0 : "纯数字密码必须大于9位",
				sign: __webpack_require__(545),
				account: __webpack_require__(177),
				comment: __webpack_require__(201),
				user: __webpack_require__(490),
				studio: __webpack_require__(771),
				paste: e => {
					console.log(e);
					let t = e.target,
						n = t;
					for (let m = 0; m < 5 && !t.__vue__; m++) {
						if (4 == m) return;
						t = t.parentNode
					}
					let o = t.__vue__;
					var i = (e = e.originalEvent)
						.clipboardData,
						a = window.navigator.userAgent;
					if (e.clipboardData && e.clipboardData.items && !(i.items && 2 === i.items.length && "string" === i.items[0].kind && "file" === i.items[1].kind && i.types && 2 === i.types.length && "text/plain" === i.types[0] && "Files" === i.types[1] && a.match(/Macintosh/i) && Number(a.match(/Chrome\/(\d{2})/i)[1]) < 49))
						for (var s = 0; s < i.items.length; s++) {
							var r = i.items[s];
							if ("file" == r.kind) {
								var l = r.getAsFile();
								if (0 === l.size) return;
								if (l.size > 2097152) return void alert("图片大小不能大于2MB");
								var c = new FormData;
								if (-1 == ["image/jpeg", "image/png", "image/gif", "image/bmp"].indexOf(l.type)) return "不支持此格式的图片";

								function d(e) {
									$.ajax({
										url: apihost + "work/uploads?token=" + getCookie("token"),
										method: "POST",
										data: e,
										cache: !1,
										contentType: !1,
										processData: !1,
										dataType: "json",
										success: function(e) {
											let t = e.data[2][0][1].Key.split("/"),
												i = "![](https://40code-cdn.zq990.com/static/internalapi/asset/" + t[t.length - 1] + ")";
											o.lazyValue = o.internalValue = o.value = o.value.substring(0, n.selectionStart) + i + o.value.substring(n.selectionEnd, o.value.length)
										},
										error: function() {
											alert("图片上传失败")
										}
									})
								}
								c.append("image", l), d(c)
							}
						}
				},
				search: __webpack_require__(557),
				forum: __webpack_require__(956)
			},
			t = {
				open: e => window.open(e),
				workview: {
					image: "6e2b0b1056aaa08419fb69a3d7aa5727.png"
				},
				detail: void 0 === getCookie("token") ? void 0 : 0,
				token: getCookie("token"),
				viewmode: "index",
				qh: function(e, t) {},
				qh3: function(e, t) {
					v.$data.viewmode = e, pagecz[e] && pagecz[e](t), setTimeout((() => {
						$("textarea")
							.unbind("paste")
							.bind("paste", v.paste)
					}), 1e3)
				},
				qh2: () => {
					let e = getQueryString("page");
					e ? -1 != ["index", "sign", "account", "mywork", "work", "workinfo", "user", "message", "search", "flist", "mystudio", "studio", "studio_edit", "about", "forum", "post", "myitem", "sc"].indexOf(e) || (e = "404") : e = "index", v.$data.qh3(e, getQueryString("id"))
				},
				sb: {
					show: !1,
					text: "",
					timeout: 2e3
				},
				sb2: {
					show: !1,
					text: ""
				},
				publish: 0,
				opensource: 0,
				rows: {
					data: []
				},
				show: {
					0: 0,
					1: 0,
					2: 0
				},
				show0: 0,
				show1: 0,
				show2: 0,
				mywork: {},
				waitRequest: {
					cover: 0
				},
				worklist: 0,
				title: "40code少儿编程社区",
				getQueryString,
				stitle: e => {
					document.title = (e || v.title) + "  -40code", e && (v.title = e)
				}
			};
		other = {
				date: e => {
					if (!e) return "未统计";
					let t = "",
						n = new Date(1e3 * e),
						o = new Date;
					var i;
					return t = n.getYear() == o.getYear() ? n.getMonth() == o.getMonth() && n.getDate() == o.getDate() ? n.getHours() + ":" + (i = n.getMinutes(), (Array(2)
							.join("0") + i)
						.slice(-2) + " ") : n.getMonth() + 1 + "-" + n.getDate() + " " : n.getYear() + 1900 + "-" + (n.getMonth() + 1) + "-" + n.getDate() + " ", t
				}
			}, window.v = new Vue({
				el: "#app",
				data: Object.assign(e, t, other),
				vuetify: new Vuetify({
					theme: {
						light: {
							primary: "#3f51b5",
							secondary: "#03A9F4",
							accent: "#EC407A",
							error: "#F44336"
						}
					}
				}),
				watch: {
					"search.page": () => {
						v.search.search()
					},
					"search.type": () => {
						v.search.title2 = -1, v.search.isfirst ? v.search.isfirst = 0 : (v.search.page = 1, v.search.author = "", v.search.name = "", v.search.search(1))
					},
					"comment.page": () => {
						v.comment.getcomment()
					},
					"user.msgpage": () => {
						setTimeout((() => {
							v.user.getmessage()
						}), 1)
					},
					"search.select": () => {
						let e = v.search.s[v.search.type].indexOf(v.search.select[v.search.type]); - 1 == e || (v.search.s2 = e)
					}
				}
			}), v.qh2(), window.addEventListener("hashchange", (function(e) {
				console.log(e), v.qh2()
			})), $(document)
			.ready((function() {
				getuserinfo(), viewer = new Viewer(document.body, {
					filter: function(e) {
						let t = $(".pm");
						for (let n = 0; n < t.length; n++)
							if (t[n].contains(e)) return !0;
						return !1
					}
				}), document.addEventListener("visibilitychange", (function() {
					document.visibilityState, "visible" == document.visibilityState && (v.stitle(), getuserinfo())
				})), setInterval((() => {
					"visible" == document.visibilityState && getuserinfo()
				}), 4e4)
			}))
	})()
})();