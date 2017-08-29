const Sequelize = require('sequelize');
var Hackathoners = {
    // 프로젝트 설정 집합
    config: {
        // DB 관련 설정 집합
        db: {
            // DB의 이름입니다.
            name: "hacka_server_db",
            // DB의 사용자 이름입니다.
            user: "root",
            // 위의 사용자 이름에 대한 비밀번호입니다.
            password: "",
            // DB 서버의 주소입니다. (포트를 제외하고 입력합니다.)
            host: "172.16.0.3",
            // 접속 대상 포트입니다. 기본값으로 3306번이 설정됩니다.
            port: "3306"
        }
    },
    // DB 공유 객체 정의 집합
    db: {
        // 초기화된 Sequelize 객체가 보관됩니다.
        sequelize: undefined,
        // 쓰일 Model들이 보관됩니다.
        model: {
            Teams: undefined,
            Members: undefined,
            Repositories: undefined,
            Commits: undefined
        }
    },
    // Socket.io 공유 객체 정의 집합
    socket: {
      io: undefined,
      users: []
    }
}

/**
 * Database 연결을 위한 초기화 과정입니다.
 */
const sequelize = new Sequelize(Hackathoners.config.db.name, Hackathoners.config.db.user, Hackathoners.config.db.password, {
  host: Hackathoners.config.db.host,
  port: Hackathoners.config.db.port,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

/**
 * Database 연결을 테스트합니다.
 */
sequelize.authenticate()
  .then(() => {
    console.log('[+] DB가 성공적으로 연결되었습니다.');
  })
  .catch(err => {
    console.error('[!] DB 연결에 실패했습니다! : ', err);
  });

/**
 * Database Model을 정의합니다.
 */
const Team = sequelize.define('Team', {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(30)
  },
  members: {
    type: Sequelize.STRING(20)
  },
  repos: {
    type: Sequelize.STRING(10)
  }
}, {
  timestamps: false
});

const Member = sequelize.define('Member', {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(30)
  },
  phone: {
    type: Sequelize.STRING(11)
  },
  email: {
    type: Sequelize.STRING(40),
    allowNull: false
  },
  github: {
    type: Sequelize.STRING(40)
  },
  groupname: {
    type: Sequelize.STRING(40)
  }
}, {
  timestamps: false
});

const Repository = sequelize.define('Repository', {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(40)
  },
  reponame: {
    type: Sequelize.STRING(40)
  },
  commits: {
    type: Sequelize.INTEGER(3)
  }
}, {
  timestamps: false
});

const Commit = sequelize.define('Commit', {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  sha: {
    type: Sequelize.STRING(40)
  },
  committer: {
    type: Sequelize.STRING(40)
  },
  timestamp: {
    type: Sequelize.STRING(25)
  },
  reponame: {
    type: Sequelize.STRING(40)
  },
  teamname: {
    type: Sequelize.STRING(40)
  }
}, {
  timestamps: false
});

Hackathoners.db.sequelize = sequelize;
Hackathoners.db.model.Teams = Team;
Hackathoners.db.model.Members = Member;
Hackathoners.db.model.Repositories = Repository;
Hackathoners.db.model.Commits = Commit;

module.exports = Hackathoners;